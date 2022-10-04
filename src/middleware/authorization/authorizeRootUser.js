module.exports = (req, res, next) => {
  if (req.user.role !== 'ONR-101') {
    return res.send({
      requestAccess: false,
      messege: 'User is not authorized', // user doesn't have root level authorization
    });
  }
  // user has root level authorization
  next();
  return 0;
};
