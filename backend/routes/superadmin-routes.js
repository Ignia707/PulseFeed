// superadmin routes

const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const superAdminMiddlware = require("../middleware/super-admin-middleware");
const {
  fetchUsersAdmins,
  demoteAdmin,
  deleteUser,
} = require("../controllers/super-admin-controller");

const router = express.Router();

// fetch all users and admins
router.get("/users", authMiddleware, superAdminMiddlware, fetchUsersAdmins);

// demote admin
router.patch("/users/:id", authMiddleware, superAdminMiddlware, demoteAdmin);

// delete user or admin
router.delete("/users/:id", authMiddleware, superAdminMiddlware, deleteUser);

module.exports = router;
