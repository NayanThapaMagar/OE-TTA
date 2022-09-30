// requiring bank schema
module.exports = {
  contact: (contact) => {
    if (Number.isNaN(contact) || JSON.stringify(contact).length !== 10) {
      return false;
    }
    return true;
  },
};
