/* eslint-disable no-unused-vars */
const isBase64 = require('is-base64');
const { cloudinary } = require('../../utils/cloudinary');
const getUserId = require('../../utils/getUserId');

module.exports = async (req, res) => {
  try {
    const imageFileWithMime = req.body.base64image;
    const myArray = imageFileWithMime.split(',');
    const imageFile = myArray[1];
    if (!imageFile || !isBase64(imageFile)) {
      return res.status(400).send({ status: 'Invalid image' });
    }
    const matches = imageFileWithMime.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (matches == null) {
      return res.status(400).send({ status: 'Invalid image' });
    }
    if (matches.length !== 3) {
      return res.status(400).send({ status: 'Invalid image' });
    }
    const userId = await getUserId(req);
    if (!userId) { // unable to get user id
      return res.status(500).send({ status: 'Something Went Wrong' });
    }
    const uploadResponse = await cloudinary.uploader.upload(imageFileWithMime, {
      upload_preset: 'OETTA',
      tags: userId,
    });
    return res.status(200).json({ Status: 'Success' });
  } catch (e) {
    return res.status(500).send({ status: 'Something Went Wrong' });
  }
};
