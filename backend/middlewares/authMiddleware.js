const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const validateToken = asyncHandler( async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
        //Get token
        token = req.headers.authorization.split(" ")[1];
        //verify token
        decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // Get user
        req.user = await User.findById(decoded.id).select("-password");
        next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not Authorized: No Token");
    }
});

module.exports = validateToken;