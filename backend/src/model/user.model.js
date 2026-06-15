import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{ type : String , require:true } ,
    email : { type : String , require : true , unique : true},
    password : { type : String , require : true , minlength:6} ,
    balance: {type : Number  , default:0} , 
},{ timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;