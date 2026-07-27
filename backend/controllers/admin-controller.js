// admin controllers

const User = require("../models/User");

// fetch all non-admin users
const fetchUsers = async (req, res) => {
  try {
    const filter = { role: "user" };

    const users = await User.find(filter);

    const displayUserData = users.map((user) => {
      return {
        username: user.username,
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

// promote user to admin
const promoteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "user") {
      return res.status(400).json({
        success: false,
        message: "Can only promote non-admin users",
      });
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User promoted to admin",
      data: user,
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
  fetchUsers,
  promoteUser,
};
