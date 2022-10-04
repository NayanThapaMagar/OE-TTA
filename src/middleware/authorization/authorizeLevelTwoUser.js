module.exports = (req, res, next) => {
  if (req.user.role !== 'ONR-101' && req.user.role !== 'MNGR-102' && req.user.role !== 'EMPY-103') {
    return res.send({
      requestAccess: false,
      messege: 'User is not authorized', // user doesn't have root level authorization
    });
  }
  // user has employee or higher level authorization
  next();
  return 0;
};
