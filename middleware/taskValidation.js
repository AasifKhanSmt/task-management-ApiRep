const validateTask = (req, res, next) => {
    const { title, status } = req.body;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Title must be at least 3 characters"
        });
    }

    const allowedStatuses = [
        "pending",
        "completed",
        "cancelled"
    ];

    if (status && typeof status !== "string" || !allowedStatuses.includes(status.trim())) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        });
    }

    next();
};

module.exports = validateTask;