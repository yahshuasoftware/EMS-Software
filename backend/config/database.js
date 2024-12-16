import mongoose  from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const connectToDatabase =async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected")

    }catch(error){
        console.log(error);
        
    }
}

export default connectToDatabase