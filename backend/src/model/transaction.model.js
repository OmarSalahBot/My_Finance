import mongoose from "mongoose";

const transactionSchema = new  mongoose.Schema({
    userId: { type : mongoose.Schema.Types.ObjectId , ref : "User" , require:true } ,
    amount: { type : Number , require : true } ,
    type: { type : String , require : true , enum : ["income" , "expense"] } ,
    description: { type : String , require : true } ,
}, { timestamps: true } );

const Transaction = mongoose.model("Transaction" , transactionSchema); 


export default Transaction; 