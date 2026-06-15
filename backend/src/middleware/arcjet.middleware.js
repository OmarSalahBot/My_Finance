import aj from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";


export const arcjetProtection = async(req, res, next) => {
    try{ 
        const decision = await aj.protect(req);

        if(decision.isDenied()){
            if(decision.reason.isRateLimit())  return res.status(429).json({ message : "Too many requests , Rate limiting executed"})
            
            if(decision.reason.isBot()) return res.status(403).json({ message: "Boting is not allowed "});

            return res.status(403).json({ message: "Access denied by security policy "});
        }

        if(decision.results.some(isSpoofedBot))
        res.status(403).json({ error :"Spoofed bot detected" , message :"Malicious bot activity detected"})
    
        next();

    }catch(err){
        res.status(500).json({ message :"Server error"});
        console.log("Server error" , err);
    }

}