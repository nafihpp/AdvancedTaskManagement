const mongoose = require("mongoose");

const TaskModel = mongoose.Schema({
    task_id: {
        type: String,
        trim: true,
        required: true,
    },
    task: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        required: [true, "status of Task this field is mandatory"],
    },
});

module.exports = {
    Task: mongoose.model("Task", TaskModel),
};
