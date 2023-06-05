app.get("/getalltasks", (req, res) => {});
app.post("/addtask", (req, res) => {
    console.log("HI");
});
app.put("/updatetask/:id", (req, res) => {
    const { id, task, completed } = req.body;
});
app.delete("/delete/:id", (req, res) => {});

module.exports = app;
