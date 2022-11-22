module.exports = {
  contact: (contact) => {
    if (Number.isNaN(contact) || contact.length !== 10) {
      return false;
    }
    return true;
  },
  emailExists: (emailToValidate) => String(emailToValidate)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
};
