// requiring bank schema
module.exports = {
  contact: (contact) => {
    if (Number.isNaN(contact) || contact.length !== 10) {
      return false;
    }
    return true;
  },
};
