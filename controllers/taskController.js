const taskService = require("../services/taskService");

const getTasks = async (req, res, next) => {
    try {

        const { status, search } = req.query;

        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        console.log(`Page ${req.query.page}, Limit ${req.query.limit}, Search ${search}, Status ${status}`)
        console.log(`Page ${page}, Limit ${limit}, Search ${search}, Status ${status}`)

        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page must be greater than 0"
            });
        }

        if (limit < 1 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: "Limit must be between 1 and 100"
            });
        }

        const offset = (page - 1) * limit;

        const result = await taskService.getTasksWithFilters(search, status, limit, offset);
        const totalPages = Math.ceil(result.total / limit);

        res.status(200).json({
            success: true,
            tasks: result.tasks,
            pagination: {
                page,
                limit,
                total: result.total,
                totalPages
            }
        });
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const task = await taskService.getTaskById(taskId);

        res.status(200).json({
            success: true,
            task
        });
    } catch (error) {
        next(error);
    }
};

const createNewTask = async (req, res) => {
    try {

        const { title, description, status } = req.body;

        const task = await taskService.createTask(title, description, status);

        res.status(201).json({
            message: "Task created successfully",
            success: true,
            task
        });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const { title, description, status } = req.body;

        const task = await taskService.updateTask(taskId, title, description, status);

        console.log("UPDATED TASK !!", task);

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        if (Number.isNaN(taskId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        await taskService.deleteTask(taskId);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTasks,
    createNewTask,
    getTaskById,
    updateTask,
    deleteTask
};