import User from "../models/User.js";
import bcrypt from 'bcrypt'
const changePassword =async (req,res) => {
    try{
        const {userId,oldPassword,newPassword}=req.body;

        const user=await User.findById({_id:userId})
        if(!user){
            return res.status(404).json({success:false,error:"User Not Found"})
        }

        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if (!isMatch) {
            return res.status(404).json({success:false,error:"Wrong old Password"})
        }

        const hashPassword=await bcrypt.hash(newPassword,10)

        const newUser=await User.findByIdAndUpdate({_id:userId},{password:hashPassword})

    }catch(error){
        return res.status(500).json({success:false,error:"setting error"})
    }
}

export {changePassword}