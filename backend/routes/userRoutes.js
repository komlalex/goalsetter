const  express = require("express");
const router = express.Router();
const {registerUser, loginUser, getUser} = require("../controllers/userController");
const validateToken = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", validateToken, getUser);

module.exports = router;
