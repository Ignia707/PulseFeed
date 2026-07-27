// Admin middleware to protect admin route

const isAdminUser = (req, res, next) => {
  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.userInfo.role === "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied! Admin or higher rights required",
    });
  }

  next();
};

module.exports = isAdminUser;
