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
    const string = JSON.stringify(currentDate);
    const myArray0 = string.split('"');
    const myArray1 = myArray0[1];
    const myArray2 = myArray1.split('T');
    const onlyDate = myArray2[0];
    const myArray = onlyDate.split('-');
    const year = myArray[0];
    const month = myArray[1];
    const day = myArray[2];

    await mongo();

    const searchResult = await timeSheet.aggregate([
      {
        $match: {
          UserId: userId,
        //   Year: year,
        //   Month: month,
        },
      },
      {
        $group: {
          _id: { day: '$Day', month: '$Month', year: '$Year' },
          //   _id: '$Day',
          totalWorkTime: {
            $sum: '$TotalTime',
          },
        },
      },
    ]).then().catch();
    return res.status(200).send({ status: 'success', searchResult });
  } catch (e) {
    return res.send({ status: 'failure', message: 'Someting went wrong', e });
  }
};
