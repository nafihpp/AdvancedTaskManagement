const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDb } = require("./config/dbConfig");

const app = express();
//Port
const PORT = process.env.PORT;
//routes import
const TaskRoutes = require("./routes/TaskRoutes");

app.use(express.json());
app.use(cors());
connectDb();

//routes
app.use("/api", TaskRoutes);

app.listen(PORT, () => {
    console.log(`server running in ${PORT}.............`);
});
