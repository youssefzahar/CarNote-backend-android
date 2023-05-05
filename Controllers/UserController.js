import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";

import { verificationMail, forgotpasswordMail, activationMail } from "../middlewares/nodemail.js";


export async function signin (req,res) {
    const {username,password} =  req.body;
    const user = await User.findOne({"username": username});
    if(!user){
        return res.status(403).json({error: "user not found"});
    }
    if(!user.active){
      return res.status(404).json({error: "user desactivated"});
  }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(402).json({error : "password failed"})
    }
    if(!user.isVerified){
        return res.status(401).json({error : "not verified",username:user.username}) 
    }
    const payload = {id:user.id};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    //res.status(200).json({success: true , token: token});
    if(user.role == "User"){
      console.log(token)
      return res.status(200).json({success: true , token: token});
    }
    if(user.role == "Shop"){
      console.log("magasin") 
      return res.status(201).json({success: true , token: token});
    }
}


export async function getuser(req, res) {
  if(!req.user){
    return res.status('401').json({error: "You're not authenticated!"});
    }
  const user = await User.findById(req.user._id);

res.status(200).json({user: user});
}

export async function signup(req , res){
  try {
      var { username , password, email, role } = req.body;
      var exists = await User.findOne({username});
      if (exists) {
          return res.status(403).json({error: "user exists !"});
        }
     var  encryptedPassword = await bcrypt.hash(password, 10);
     const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,digits:true,lowerCaseAlphabets:false })
      var user = await User.create({
       username,
       password: encryptedPassword,
       otp: otp,
       email,
       role,
      // image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
      });
    verificationMail(req,user)
     res.status(200).json({ message : "user added" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
}


export async function verifyAccount(req,res){
    try{
       // const email = req.query.email;
        const user= await User.findOne({"username": username})
        console.log(user);
        if(user){
            user.isVerified=true
            await user.save()
            res.render('pages/verify')
        }else{
            res.status(401).json({Error:"Error process"})
        }
    }
    catch(e){
        res.status(500).json({Error:"Server error"})
    }
}

export async function updateUser(req,res){
  try {
    if(!req.user){
      return res.status('401').json({error: "You're not authenticated!"});
      }
      const user = await User.findById(req.user._id);
      var password=req.body.password;
      var email=req.body.email;
      const  encryptedPassword = await bcrypt.hash(password, 10);
      user.password=encryptedPassword;
      user.email=email;
      user.save();
      res.status(200).json( {message : "user updated" })
    } catch (error) {
    console.log(error);
  }
}

export async function desactivateUser (req,res){
    try{
      if(!req.user){
        return res.status('401').json({error: "You're not authenticated!"});
        }
        const user= await User.findOne({"_id": req.user._id})
        console.log(user);
        if(user){
            user.active=false;
            await user.save()
            res.status(200).json( {message : "user desactivated" })
        }else{
            res.status(402).json({Error:"Error process"})
        }
    }
    catch(e){
        res.status(500).json({Error:"Server error"})
    }
}


export async function activateUser (req,res){
  try{
    const email = req.query.email;
    const user= await User.findOne({"email": email})
    console.log(user);
    if(user){
        user.active=true
        await user.save()
        res.render('pages/activate')
    }else{
        res.status(401).json({Error:"Error process"})
    }
}
catch(e){
    res.status(500).json({Error:"Server error"})
}
}

export async function sendOTP(req,res){

  const user = await User.findOne({ username:req.body.username});
  console.log(user);
  const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,digits:true,lowerCaseAlphabets:false })
      user.otp = otp;
      user.save();
      forgotpasswordMail(req,user)
      .then(() => {
        res.status(200).json({ message:"otp mail sent" });
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
}

export async function verifyOTP(req,res){
  try {
    const user = await User.findOne({ otp:req.body.otp });
    if(user)
    {
      res.status(200).json({ message:"correct otp" });
    }
    else
    {
      res.status(500).json({ message:"wrong otp" });
    }
    
  } catch (error) {
    console.log(error);
  }

}


export async function resetPassword(req, res) {

    const user = await User.findOne({ username:req.body.username});
    var password = req.body.password;
    var  hashed = await bcrypt.hash(password, 10);
    user.password=hashed;
    user.save()
  .then(() => {
    res.status(200).json({ message:"new password" });
  })
  .catch(err => {
    res.status(500).json({ error: err })
  })
}


export async function sendactivationmail(req , res){
  try {
      var username = req.body.username;
      var user = await User.findOne({username});
      activationMail(req,user)
     res.status(200).json({ message : "activation mail sent" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
}

export async function userimage(req, res) {
    if(!req.user){
      return res.status('401').json({error: "You're not authenticated!"});
      }
    let newUser = {};
      newUser = {
        image: `${req.file.filename}`

      }
    User.findByIdAndUpdate(req.user._id, newUser)
    .then(() => {
      res.status(200).json({ message:"user image modified" });
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}
