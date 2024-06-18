const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors =require("cors");
const app = express();
const bodyParser = require('body-parser');
const mainRoute = require("./routes/index.js");
const port = 5000;

dotenv.config()

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB")
    } catch (error) {
        throw error
    }
}

app.use(cors({ origin:"http://localhost:3000", credentials: true }))
app.use(bodyParser.json());
app.use("/api", mainRoute);

app.listen(port, () => {
    connect();
  console.log(`Example app listening on port ${port}`);
});
