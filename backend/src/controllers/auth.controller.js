import User from '../model/user.model.js';
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";


export const signup = async ( req , res ) => {
    try{
        const { username , email , password } = req.body;
        // Make sure all the field are full 
        if(!username || !email || !password){
            return res.status(400).json({message : "All fields are required"})
        }
        // Checking if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(!passwordRegex.test(password)){
            return res.status(400).json({errType:"Password",message : "Password must contain capital and small letter and numbers and should be longer than 6 items"})
        }

        // Checking the email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({errType:"email", message: "Enter a vaild email please "})
        }
        
        const newUserEmail = await User.findOne({email: email.toLowerCase()});


        // Make sure that email is unique
        if(newUserEmail) return res.status(400).json({message : "Email is already exist"});

        
        // Make incrypting the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // creating the new user
        const newUser = await User.create({ 
        username: username , 
        email: email.toLowerCase() , 
        password: hashPassword 
    });
        generateToken(newUser._id , res);

        // removing the password
        const user = newUser.toObject();
        delete user.password;
        // Sending The User Data 
        return res.status(201).json( user );



    }catch(err) {
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
} 


export const login = async ( req , res ) => {
    try{
        const { email , password } = req.body;

        // checking if the fields is empty
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"})
        }

        const user  = await User.findOne({email:email.toLowerCase()}).lean();
        // checking if the email exists 
        if(!user) return res.status(400).json({message:"Invalid information"});

        // checking if the password is correct 
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid information"});

        generateToken(user._id,res);

        delete user.password;
        

        return res.status(200).json( user );

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}


export const logout = (_,res) => {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message : "Logout successfully"})
}


