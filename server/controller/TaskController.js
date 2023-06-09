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
        const { task_id, task, completed } = req.body.currentTodo;
        console.log(req.body);
        const requiredFields = ["task_id", "task", "completed"];
        missingReqBody(requiredFields, req.body.currentTodo, res);
        const Newtask = {
            task_id,
            task,
            completed,
        };
        const NewTaskResponse = await Task.create(Newtask);
        console.log(NewTaskResponse);
        return res.status(200).json({ message: "successfully added task" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTask = async (req, res) => {
    try {
        const { task_id, task, completed } = req.body.data.updatedTask;
        const requiredFields = ["task_id", "task", "completed"];
        missingReqBody(requiredFields, req.body.data.updatedTask, res);
        if (task === "") {
            return res
                .status(404)
                .json({ message: `Updating Task can't be empty` });
        }
        const updatedTask = {
            task_id,
            task,
            completed,
        };
        const isExist = await Task.findOne({ task_id: task_id });
        if (isExist) {
            await Task.updateOne({ task_id: task_id }, { $set: updatedTask });
            return res.status(200).json({ message: `updated Successfully` });
        }
        return res.status(404).json({ message: "Failed to update the task" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
const deleteTask = async (req, res) => {
    try {
        const delete_id = req.query.remove;
        const isExist = await Task.findOne({ task_id: delete_id }).select(
            "task_id task completed"
        );

        if (isExist) {
            const response = await Task.deleteOne({ task_id: delete_id });
            return res
                .status(200)
                .json({ message: "Task Removed Successfully" });
        }
        return res
            .status(404)
            .json({ message: "Task not found to be deleted" });
    } catch (error) {}
};

const markAsComplete = async (req, res) => {
    try {
        const task_id = req.params.id;
        const isExist = await Task.findOne({ task_id: task_id }).select(
            "task_id task completed"
        );
        if (isExist) {
            let completed = {
                task_id: task_id,
                task: isExist.task,
                completed: !isExist.completed,
            };
            await Task.updateOne(
                { task_id: task_id },
                { $set: completed },
                { new: true }
            );
            return res.status(!isExist.completed === true ? 200 : 301).json({
                message: `${isExist.task} is set to ${
                    !isExist.completed === true ? "completed" : "unfinished"
                }`,
            });
        }
    } catch (error) {
        res.status(500).status({ message: "System error" });
    }
};
module.exports = {
    getAllTask,
    addTask,
    updateTask,
    deleteTask,
    markAsComplete,
};
