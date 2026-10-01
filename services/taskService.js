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

const getTasksWithFilters = async (searchTerm, status, limit, offset) => {
    return await taskRepository.findAllWithFilters(searchTerm, status, limit, offset);
};

const getTaskById = async (taskId) => {
    return await taskRepository.getTaskById(taskId);
};

const createTask = async (title, description, status) => {
    const newTask = {
        title: title.trim(),
        description: description?.trim() || null,
        status: status || "pending"
    };

    return await taskRepository.create(newTask);
};

const updateTask = async (taskId, title, description, status) => {
    const existingTask = await taskRepository.getTaskById(taskId);

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

const deleteTask = async (taskId) => {
    const existingTask = await taskRepository.getTaskById(taskId);

    if (!existingTask) {
        throw new Error("Task not found");
    }

    return await taskRepository.remove(taskId);
};

module.exports = {
    getAllTasks,
    getTasksWithFilters,
    // getTaskByStatus,
    // searchTask,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};