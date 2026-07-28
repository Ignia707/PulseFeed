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

// delete a user or admin
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

    if (user.role === "superadmin") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a superadmin",
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
  fetchUsersAdmins,
  demoteAdmin,
  deleteUser,
};
