/* eslint-disable no-buffer-constructor */
/* eslint-disable prefer-destructuring */
const fs = require('fs-extra');
const mime = require('mime');
// const path = require('path');

module.exports = async (req, res) => {
  // to declare some path to store your converted image
  try {
    const imageName = req.body.fileName;
    const matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const response = {};

    if (matches.length !== 3) {
      return res.send({ status: 'Invalid input string' });
    }

    response.type = matches[1];
    // response.data = new Buffer(matches[2], 'base64');
    // response.data = new Buffer(matches[2], 'base64');
    response.data = Buffer.from(matches[2], 'base64');
    const decodedImg = response;
    console.log(decodedImg);
    const imageBuffer = decodedImg.data;
    const type = decodedImg.type;
    const extension = mime.getExtension(type);
    const fileName = `${imageName}.${extension}`;
    // const uploadPath = 'images';
    await fs.writeFileSync(`./src/files/images/screenshots/${fileName}`, imageBuffer);
    // E:\Online Employee Work trcking system\src\files\images\screenshots
    // await fs.writeFileSync(path.join(uploadPath, fileName), imageBuffer);
    return res.send({ status: 'success' });
  } catch (e) {
    console.log(e);
    return res.send({ status: 'failure' });
  }
};
