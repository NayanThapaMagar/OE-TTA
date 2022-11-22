/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
const mongo = require('../../config/database');

// requiring register schema
const activeSession = require('../../modules/activeSession');
const timeSheet = require('../../modules/timeSheet');
const getUserId = require('../../utils/getUserId');
const timeDiffCalculator = require('../../utils/timeDiffCalculator');

module.exports = async (req, res) => {
  try {
    const userId = await getUserId(req);
    if (!userId) { // unable to get user id
      return res.status(500).send({ status: 'Something Went Wrong' });
    }
    const currentDate = new Date();

    // connectiong to database
    await mongo();

    const isActive = await activeSession.findOne({ UserId: userId }).then()
      .catch(() => 0);
    if (!isActive) return res.status(400).send({ status: 'failure', message: 'Session is not active' });
    // console.log(isActive);
    const totalTime = await timeDiffCalculator(isActive.Date, currentDate);
    const NewTimeSheet = new timeSheet({
      UserId: userId,
      Date: currentDate,
      StartedAt: isActive.Date,
      EndedAt: currentDate,
      TotalTime: totalTime * 60, // in minutes
    });
    const uploadResult = await NewTimeSheet.save()
      .then()
      .catch(() => 0);
    if (!uploadResult) return res.status(400).send({ status: 'failure' }); // if error
    const del = await activeSession.deleteOne({ UserId: userId }).then()
      .catch(() => 0);
    if (!del) return res.status(400).send({ status: 'failure' }); // if error
    return res.status(200).send({ status: 'success' });
  } catch (e) {
    return res.send({ status: 'failure', message: 'Someting went wrong' });
  }
};
