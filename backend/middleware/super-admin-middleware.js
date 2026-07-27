// super admin middlware

const superAdminMiddlware = (req, res, next) => {
  if (!req.userInfo) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (req.userInfo.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Access denied!",
    });
  }

  next();
};

module.exports = superAdminMiddlware;
