// superadmin controllers

const User = require("../models/User");

// fetch all non-admin users
const fetchUsersAdmins = async (req, res) => {
  try {
    const filter = {
      role: {
        $in: ["user", "admin"],
      },
    };

    const users = await User.find(filter);

    const displayUserData = users.map((user) => {
      return {
        username: user.username,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      data: displayUserData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

// demote admin to user
const demoteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (admin.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Ony admins can be demoted",
      });
    }

    admin.role = "user";
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin demoted to user",
      data: admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

module.exports = {
  fetchUsersAdmins,
  demoteAdmin,
};
