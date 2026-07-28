// Admin route

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const {
  fetchUsers,
  promoteUser,
  deleteUser,
} = require("../controllers/admin-controller");

router.get("/", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome to admin page",
  });
});

// fetch all users
router.get("/users", authMiddleware, adminMiddleware, fetchUsers);

// promote user
router.patch("/users/:id", authMiddleware, adminMiddleware, promoteUser);

// delete user
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
