const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const { connectDb } = require("./config/dbConfig");
dotenv.config();
//Port
const PORT = process.env.PORT | 6000;
//routes import
const TaskRoutes = require("./routes/TaskRoutes");

app.use(express.json());
app.use(cors());
connectDb();

//routes
app.use("/api", TaskRoutes);

app.listen(PORT, () => {
    console.log(`server running in ${PORT}`);
});
