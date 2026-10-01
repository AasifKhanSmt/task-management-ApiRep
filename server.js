require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes);

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