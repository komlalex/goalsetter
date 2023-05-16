const express = require("express");
const path = require("path");
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
   

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html")))
} else {
    app.get("*", (req,res) => res.send("Please set to prodution"));
}
app.use(errorHandler);   

app.listen(port, () => console.log("Server started on port", port))