require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running 🚀"
    });
});

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});