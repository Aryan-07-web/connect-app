import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({message: "Unauthorized, No token provided"});
    }

    // to decode the token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({message: "Unauthorized, Invalid token"});
    }

    // select everything except password from the user model
    const user =  await User.findById(decoded.userId).select("-password");

    if(!user){
      return res.status(404).json({message: "User not found"});
    }

    req.user = user; // attach the user to the request object
    next(); // call the next middleware
  }
  catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({message: "Internal server error"});
  }
}