import e from "express";
const router=e.Router()
import { userType } from "../types.js";
import { User } from "../db.js";
import { jenerateToken } from "./generateToken.js";
router.post('/signup',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const payload=userType.safeParse(req.body)
       
        if(!payload.success){return res.status(411).json({message:"password lenght should be at least 3 "})}
        const user=await User.findOne({username:username})
        if(user){
            return res.status(411).json({message:"username alerady exist"})
        }
        const newuser=new User({
            username,
            password
        })

        const token=jenerateToken({username})
       
        await newuser.save()
        return res.status(201).json({user:newuser,  token:token})

    }catch(error){
        console.log("errorin singup ",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username:username, password:password})
        if(!user){
            return res.status(411).json({message:"incorrect username/password"})
        }
        
        const token=jenerateToken({username})
       
        return res.status(200).json({user:user , token:token})

    }catch(error){
        console.log("errorin login ",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
})

export default router



