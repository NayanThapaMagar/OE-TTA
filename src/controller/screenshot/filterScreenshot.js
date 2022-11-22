const { cloudinary } = require('../../utils/cloudinary');
const getUserId = require('../../utils/getUserId');

module.exports = async (req, res) => {
  try {
    const { query } = req;
    const { date } = query;
    if (!date) { // unable to get date
      return res.status(500).send({ status: 'Something Went Wrong' });
    }
    const userId = await getUserId(req);
    if (!userId) { // unable to get user id
      return res.status(500).send({ status: 'Something Went Wrong' });
    }
    const { resources } = await cloudinary.search
      .expression(`folder:OETTA AND tags=${userId}`)
      .expression(`folder:OETTA AND tags=${userId} AND uploaded_at=${date}`)
      .sort_by('public_id', 'desc')
      .max_results(999999)
      .execute();
    const img = resources.map((file) => ({
      imageId: file.asset_id,
      imageName: file.filename,
      imageUrl: file.url,
      createdAt: file.created_at,
    }));
    return res.status(200).send({ status: 'success', image: img });
  } catch (e) {
  // } catch (e) {
    return res.status(500).send({ status: 'failure' });
  }
};
