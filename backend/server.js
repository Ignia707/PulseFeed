// Entry point

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDB = require("./database/db");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const superAdminRoutes = require("./routes/superadmin-routes");
const uploadImageRoutes = require("./routes/image-routes");

connectToDB();

// Middlewares

app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);
app.use("/api/superadmin", superAdminRoutes);

// Run the app
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
