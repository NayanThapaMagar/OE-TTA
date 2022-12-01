const { ObjectId } = require('mongoose').Types;

// requiring addUserschema
const mongo = require('../../config/database');

const user = require('../../modules/register/user');
// eslint-disable-next-line consistent-return
module.exports = async (req, res) => {
  // connectiong to database
  await mongo();
  const { query } = req;
  const { id } = query;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(404).send({
        getUsers: false,
        message: 'Someting went wrong',
      });
    }
    // getting receipts from database
    user.find({ _id: id }).then((result) => {
      console.log(result);
      return res.status(200).send({
        getUsers: false,
        message: result,
      });
    }).catch(() => {
      // return res.status(404).send({ getUsers: false,
      //   message: 'Someting went wrongsdkjskdjnlkjB',
      // });
    });
  } catch (error) {
    res.status(404).send({
      getUsers: false,
      message: 'Someting went wrong',
    });
  }
};
