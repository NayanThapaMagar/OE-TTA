/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongoose').Types;

// requiring addUserschema
const mongo = require('../../config/database');

const user = require('../../modules/register/user');

const getUserId = require('../../utils/getUserId');
// eslint-disable-next-line consistent-return
module.exports = async (req, res) => {
  // connectiong to database
  await mongo();
  const userId = await getUserId(req);
  if (!userId) { // unable to get user id
    return res.status(500).send({ status: 'Something Went Wrong' });
  }
  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(404).send({
        getUsers: false,
        message: 'Someting went wrong',
      });
    }
    // getting receipts from database
    user.find({ _id: userId }).then((result) => {
      const profile = result[0];
      const User = {
        Name: profile.Full_Name,
        Address: profile.Address,
        Contact: profile.Contact,
        Email: profile.Email,
        UserId: profile._id,
        userRole: profile.Role,
      };
      return res.status(200).send({
        getUsers: true,
        User,
      });
    }).catch(() => {
      res.status(404).send({
        getUsers: false,
        message: 'Someting went wrong',
      });
    });
  } catch (error) {
    res.status(404).send({
      getUsers: false,
      message: 'Someting went wrong',
    });
  }
};
