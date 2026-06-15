import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import "dotenv/config";
import path from "path"
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import cors from 'cors';


const app = express();

const __dirname = path.resolve();


// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());


// routes
app.use("/api/auth" , authRoutes);
app.use("/api/transactions" , transactionRoutes);


// make it ready from deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get(/.*/, (_,res)=>{
        res.sendFile(path.join(__dirname,'../frontend' , "dist" , "index.html"));
    });

}

// PORT
const PORT = process.env.PORT || 3000;

app.listen( PORT , ()=> {
    console.log("Server running on PORT:"+ PORT);
    connectDB();
});