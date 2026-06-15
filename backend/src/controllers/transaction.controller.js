import User from '../model/user.model.js';
import Transaction from '../model/transaction.model.js';

export const getMonthlySummary = async (req , res) => {
    try{
        const userId = req.user._id;

        const today = new Date();
    
        // Getting the first day of the month 
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        // Getting the last day of the month
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1 , 0, 23,59,59,999);

        const totals = await Transaction.aggregate([
            {
                $match:{
                    userId:userId,
                    createdAt:{ $gte: startOfMonth , $lte: endOfMonth }
                }
            },
            {
                $group: {
                    _id:0 ,
                    totalIncome:{
                        $sum:{ $cond:[{$eq:["$type","income"]} , "$amount" , 0] }
                    },
                    totalExpense:{
                        $sum:{ $cond:[{$eq:["$type","expense"]} , "$amount" , 0 ] }
                    }
                }
            }
        ])


        res.status(200).json(totals);

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}

export const createTransaction = async ( req , res ) => {
    try{

        const userId = req.user._id;
        let updatedUser;

        const { type , amount , description } = req.body;

        // checking if the fields is empty
        if(!type || !amount || !description) return res.status(400).json({ message : "All fields are required" });

        const newTransaction = await Transaction.create( { userId , type , amount , description } );

        // Updating user balance 
        const balanceChange = type === "income"? amount: -amount;

        updatedUser = await User.findByIdAndUpdate( userId , { $inc: { balance: balanceChange } } , { returnDocument: 'after'} );

        const finalUser = updatedUser.toObject();
        delete finalUser.password;
        
        res.status(201).json( { newTransaction , finalUser } );

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}

export const getLast7DaysExpenses = async ( req , res ) => {
    try{
        const userId = req.user._id;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);


        const expenses = await Transaction.aggregate([
            {
                $match:{
                    userId: userId ,
                    type:"expense",
                    createdAt: {
                        $gte: sevenDaysAgo 
                    }
                }
            }
            ,
            {
                $group:{
                    _id:{
                        $dateToString:{
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    },
                    totalAmount:{ $sum: "$amount" }
                }
            },{
                $sort:{ _id: 1 }
            }
        ])

        res.status(200).json(expenses);

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}

export const getLastTransactions = async ( req , res ) => {
    try{
        const userId = req.user._id;
        const page = req.params.page;
        const limit = 5;
        const skip = (page - 1) * limit;


        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1}).skip(skip).limit(limit);
        // counting all the transactions on the Database
        const totalTransactions = await Transaction.countDocuments({ userId });
        // counting all pages
        const totalPages =  Math.ceil( totalTransactions / limit );


        res.status(200).json({
            transactions,
            totalPages,
            totalTransactions
        })

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}

export const DeleteTransaction = async ( req , res ) => {
    try{    
        const userId = req.user._id;
        const TransId = req.params.id;
        let updatedUser;

        const DeletedTransaction = await Transaction.findByIdAndDelete(TransId);
        // Check if it is exist
        if(!DeletedTransaction) res.status(400).json({ message:" Transaction is not found "})
            

        // Updating user
        const balanceChange = DeletedTransaction.type === "income"? -DeletedTransaction.amount: DeletedTransaction.amount;

        updatedUser = await User.findByIdAndUpdate( userId , { $inc: { balance: balanceChange } } , { returnDocument: 'after'} );

        const finalUser = updatedUser.toObject();
        delete finalUser.password;


        res.status(200).json({ message:" Deleted Successfully " ,  finalUser });

    }catch(err){
        res.status(500).json({message: 'Server Error',err});
        console.log(err);
    }
}