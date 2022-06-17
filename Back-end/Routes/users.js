const router = require("express").Router();
const User = require("../Models/User");
const verify = require("../VerfiyToken") ;
const CryptoJS = require("crypto-js");

//UpDate Users
router.put("/:id",verify,async(req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.SECRET_KEY
            ).toString();
          }
        try{
            const user =await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    // user.username= req.body.username;
    // user.fullname= req.body.fullname;
    // user.phone=req.body.phone;
    // user.email=req.body.email;
    // user.password= req.body.password;
 
    // User.UserVid=req.body.UserVid||User.UserVid;
    const newUser=await user.save();
    res.status(200).json(newUser);
        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not an admin");
    }
    
})

//Delete a user

router.delete("/:id",verify,async(req,res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User was deleted");
        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You can't delete this account");
    }
})

//Get by id
router.get("/find/:id",async(req,res)=>{
    
        try{
            const user = await User.findById(req.params.id);
            const { password, ...info } = user._doc;
            res.status(200).json(info);
        }
        catch(error){
            res.status(500).json(error);
        }
    
})

//Get all users only accessed by Admin
router.get("/",verify,async(req,res)=>{
    if( req.user.isAdmin){
        try{
            const AllUsers=await User.find();
            res.status(200).json(AllUsers);
        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not an admin");
    }
})

module.exports=router;