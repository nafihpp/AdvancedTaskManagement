const express = require("express");
const {
    getAllTask,
    addTask,
    updateTask,
    deleteTask,
} = require("../controller/taskController");
const router = express.Router();

router.get("/all-tasks", getAllTask);
router.post("/add-task", addTask);
router.put("/update-task", updateTask);
router.delete("/remove-task/:id", deleteTask);

module.exports = router;
