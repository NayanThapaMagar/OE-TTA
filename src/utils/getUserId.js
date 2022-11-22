module.exports = async (req) => {
  try {
    const id = req.user.userId;
    return (id);
  } catch (e) {
    return null;
  }
};
