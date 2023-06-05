const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const { connectDb } = require("./config/dbConfig");
dotenv.config();

const PORT = process.env.PORT | 6000;

app.use(express.json());
app.use(cors());
connectDb();

app.listen(PORT, () => {
    console.log(`server running in ${PORT}`);
});
