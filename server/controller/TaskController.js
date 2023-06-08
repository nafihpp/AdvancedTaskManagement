const { Task } = require("../model/TaskModel");
const { missingReqBody } = require("../utils/MissingBody");

const getAllTask = async (req, res) => {
    try {
        const allTasks = await Task.find().select("task_id task completed");
        return res.status(200).json(allTasks);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
const addTask = async (req, res) => {
    try {
        const { task_id, task, completed } = req.body.data.currentTodo;
        const requiredFields = ["task_id", "task", "completed"];
        missingReqBody(requiredFields, req.body.data.currentTodo, res);
        let Newtask = {
            task_id,
            task,
            completed,
        };
        const NewTaskResponse = await Task.create(Newtask);
        console.log(NewTaskResponse);
        return res.status(200).json({ message: "successfully added task" });
    } catch (error) {
        res.status(500).json({ message: "error found" });
    }
};
const updateTask = async (req, res) => {
    try {
        const { task_id, task, completed } = req.body.data.updatedTask;
        const requiredFields = ["task_id", "task", "completed"];
        missingReqBody(requiredFields, req.body.data.updatedTask, res);
        const updated = await Task.findByIdAndUpdate(
            task_id,
            {
                task: task,
                completed: completed,
            },
            { new: true }
        );
        console.log(updated, "====");
    } catch (error) {
        res.status(500).json("failed");
    }
};
const deleteTask = (req, res) => {
    console.log("HI");
};
module.exports = {
    getAllTask,
    addTask,
    updateTask,
    deleteTask,
};
