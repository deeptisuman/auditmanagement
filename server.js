const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Debugging Logs
console.log("MongoDB URI:", process.env.MONGO_URI);
console.log("Server Port:", process.env.PORT);

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Allows JSON data in requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if MongoDB fails to connect
});

// ✅ Import Routes
const auditRoutes = require("./routes/auditRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

// ✅ Use Routes (Fix Incorrect Mounting)
app.use("/api/audits", auditRoutes);
app.use("/api/tickets", ticketRoutes);

// Default Route (Health Check)
app.get("/", (req, res) => {
    res.send("✅ Audit API is running!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// Handle Uncaught Errors
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection:", reason);
});
