const express = require("express");
const {
    getAllTask,
    addTask,
    updateTask,
    deleteTask,
    markAsComplete,
} = require("../controller/taskController");
const router = express.Router();

router.get("/all-tasks", getAllTask);
router.post("/add-task", addTask);
router.put("/update-task", updateTask);
router.delete("/remove-task/", deleteTask);
router.get("/mark-as-complete/:id", markAsComplete);

module.exports = router;
