const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");


//@desc Get gaols
//@route GET api/goals
//@access Private
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find({user: req.user.id});

    return res.status(200).json(goals);
})

//@desc Set Goal
//@route POST api/goals
//@access Private
const setGoal = asyncHandler( async (req, res) => {

    if (!req.body.text) {
     res.status(400);
     throw new Error("Fill the text field.")
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    });
  
    return res.status(200).json(goal);
})

//@desc Update Goal
//@route PUT api/goals/:id
//@access Private
const updateGoal = asyncHandler( async (req, res) => { 
    const {text} = req.body;
    //Make sure valid text field is provided
    if (!text || !text.trim()) {
        throw new Error("Please fill text field");
    }

    const goal = await Goal.findById(req.params.id);

    //Make sure goal exists
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found")
    }
    
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User Not Authorized");
    }  

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedGoal);
})

//@desc Delete Goal
//@route DELETE api/goals/:id
//@access Private
const deleteGoal = asyncHandler ( async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error ("Goal Not Found!!!")
    }
    
    //Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User Not Authorized");
    }
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id});
})
module.exports = {
    getGoals, 
    setGoal, updateGoal,
     deleteGoal
    }