const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Add it in server/.env");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing. Add it in server/.env");
  process.exit(1);
}

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.send("Product API running");
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);


// ✅ ✅ ADD THIS PART (IMPORTANT)

// Serve frontend build
const __dirname1 = path.resolve();

// If your frontend build folder is inside server/dist
app.use(express.static(path.join(__dirname1, "dist")));

// React routing support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "dist", "index.html"));
});


// ✅ END


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});