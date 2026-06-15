import jwt from "jsonwebtoken";

export const generateToken = (userId , res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{  
        expiresIn:"7d"
    }); // to make a strong token you can use : node -e "console.log(require('crypto').randomBytes(64).toString('hex'))";
    
    res.cookie("jwt" , token , {
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
        httpOnly : true, // Prevent XSS attacks : cross side-scripting
        sameSite:"strict", // CSRF Attacks
        secure: process.env.NODE_ENV == "development" ? false : true
    });
    
    return token;
}