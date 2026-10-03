const express = require("express");

const taskController = require("../controllers/taskController");
const validateTask = require("../middleware/taskValidation");
const router = express.Router();


router.get("/", taskController.getTasks);
router.post("/", validateTask, taskController.createNewTask);
router.get("/:id", taskController.getTaskById);
router.put("/:id", validateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;