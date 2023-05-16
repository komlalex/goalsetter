const express = require("express");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const {errorHandler} = require("./middlewares/errorMiddleware");
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");


    


const port  = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();   

    

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);   

app.listen(port, () => console.log("Server started on port", port))