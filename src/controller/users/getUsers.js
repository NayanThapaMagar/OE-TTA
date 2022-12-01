/* eslint-disable no-underscore-dangle */
const mongo = require('../../config/database');

const user = require('../../modules/register/user');

module.exports = async (req, res) => {
  // connectiong to database
  await mongo();

  try {
    user.find().then(async (result) => {
      const userList = [];
      result.forEach((element) => {
        const User = {
          Name: element.Full_Name,
          Address: element.Address,
          Contact: element.Contact,
          Email: element.Email,
          UserId: element._id,
          userRole: element.Role,
        };
        userList.push(User);
      });
      return res.status(200).send({
        getUsers: true,
        userList,
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
