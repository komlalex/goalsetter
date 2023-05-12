const express = require("express");
const router = express.Router();
const {getGoals, setGoal, updateGoal, deleteGoal} = require("../controllers/goalController");
const validateToken = require("../middlewares/authMiddleware");


router.route("/").get(validateToken, getGoals).post(validateToken, setGoal);
router.route("/:id").put(validateToken, updateGoal).delete(validateToken, deleteGoal);


module.exports = router;