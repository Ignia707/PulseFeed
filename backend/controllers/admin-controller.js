// admin controllers

const User = require("../models/User");

// fetch all non-admin users
const fetchUsers = async (req, res) => {
  try {
    const filter = { role: "user" };

    // Pagination and Sorting
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit; // skip the initial images to display next set of images

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(filter).sort(sortObj).skip(skip).limit(limit);

    const displayUserData = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
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

// delete a plain user
const deleteUser = async (req, res) => {
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
        message: "Can only delete non-admin users",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted",
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
  deleteUser,
};
