const taskRepository = require("../repositories/taskRepository");

const getAllTasks = async () => {
    return await taskRepository.findAll();
};

// const getTaskByStatus = async (status) => {
//     return await taskRepository.getTaskByStatus(status);
// };

// const searchTask = async (searchText) => {
//     return await taskRepository.searchTask(searchText);
// };

const getTasksWithFilters = async (searchTerm, status, limit, offset, userId) => {
    return await taskRepository.findAllWithFilters(searchTerm, status, limit, offset, userId);
};

const getTaskById = async (taskId, userId) => {
    return await taskRepository.getTaskById(taskId, userId);
};

const createTask = async (title, description, status, userId) => {
    const newTask = {
        title: title.trim(),
        description: description?.trim() || null,
        status: status || "pending",
        userId
    };

    return await taskRepository.create(newTask);
};

const updateTask = async (taskId, userId, title, description, status) => {
    const existingTask = await taskRepository.getTaskById(taskId, userId);

    if (!existingTask) {
        throw new Error("Task not found");
    }

    const taskData = {
        title: title.trim(),
        description: description?.trim() || null,
        status: status || "pending"
    };

    console.log("TASK DATA !!", taskData);

    return await taskRepository.update(taskId, taskData);
};

const deleteTask = async (taskId, userId) => {
    const existingTask = await taskRepository.getTaskById(taskId, userId);

    if (!existingTask) {
        throw new Error("Task not found");
    }

    return await taskRepository.remove(taskId, userId);
};

const findPendingTasksWithUsers = async () => {
    return await taskRepository.findPendingTasksWithUsers();
};  


module.exports = {
    getAllTasks,
    getTasksWithFilters,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    findPendingTasksWithUsers
};