// requiring bank schema
module.exports = {
  contact: (contact) => {
    if (isNaN(contact) || JSON.stringify(contact).length != 10) {
        return false;
    } else {
        return true;
    }
  },
};
