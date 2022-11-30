module.exports = async (req, res) => {
  try {
    const accessToken = null;
    res.header({ Authorization: `Bearer ${accessToken}` });

    // sending response back
    return res.status(200).json({
      logout: true,
      message: 'logout Successful',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Someting went wrong',
    });
  }
};
