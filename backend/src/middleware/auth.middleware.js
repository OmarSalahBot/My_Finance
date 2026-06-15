import jwt from "jsonwebtoken";
import User from '../model/user.model.js';
import "dotenv/config";

export const protectRoute = async (req , res , next) => {
    try{
        let token = req.cookies.jwt;

        // check if the token it already exist 
        if(!token) return res.status(400).json({ message: "Unauthorized - No token" });

        // check if the token is valid 
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if(!decoded) return res.status(400).json({ message:" Unauthorized- Invalid token "});

        // geting the user
        const user = await User.findById(decoded.userId).select("-password");

        req.user = user;
        next();

    }catch(err){
        console.error( "Auth middleware err" , err.message );
        return res.status(500).json({ message: "Server Err" });
    }
    
}
