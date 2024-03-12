const User=require('../model/user')
const jwt=require('jsonwebtoken');
const Otp=require('../model/otp');
const SendEmailUtility=require('../utility/emailSend')

exports.registration=async(req,res)=>{
    try{
        await User.create(req.body);
        res.json({status:"successfully",message:"registration completed"})
    }
    catch(error)
    {
        res.json({status:"fail",message:error})
    }
}

exports.login=async (req,res)=>{
    try{
        const user=await User.find(req.body);
        if(user.length>0)
        {
            let PayLoad={exp:Math.floor(Date.now()/1000)+(86500),data:req.body['email']};
            let token= jwt.sign(PayLoad,"123-abc");
            res.json({status:"user found",token:token})
        }
        else res.json({status:"login fail"})
    }
    catch(error){
        res.json({status:"fail",message:error})
    }

}

exports.profileUpdate=async(req,res)=>{
    
  try{
    const user=await User.updateOne({email:req.email},
        req.body
        )
        res.json({status:"updated successfully",user:user});
  }
  catch(err)
  {
        res.json({status:"fail"});
  }

}

exports.profileDetails=async(req,res)=>{

    try{
        const user=await User.find({email:req.email});
        res.send(user);
    }
    catch(err)
    {
        res.send({status:"no user found"})
    }
   
    

}
exports.verifyEmail=async(req,res)=>{
    const user=await User.find({email:req.params.email});
    try{
            if(user)
        {
            let otp=Math.floor(100000+Math.random()*900000);
            await Otp.create({email:req.params.email,otp:otp,status:'active'});

            await SendEmailUtility(req.params.email,`your pin is ${otp}`,"task management");

            res.json({status:"please check the email"})

        }
        else res.json({status:"can not find email"})
    }
    catch(err)
    {
        res.json({status:"fail to load"})

    }

}

exports.verifyOTP=async(req,res)=>{
    try {
        const {email,otp}=req.params;
        let user= await Otp.find({email:email,otp:otp,status:'active'})
        if (user.length>0){
            await Otp.updateOne({email:email,otp:otp},{status:'verified'})
            res.json({status:"success",message:"Code Verification Success"})
        }
        else{
            res.json({status:"fail",message:"Invalid Code"})
        }

    }catch (err) {
        res.json({status:"fail",message:err})
    }
}

exports.passwordReset=async(req,res)=>{
    try {
        const {email,otp,password}=req.params;
        let user= await Otp.find({email:email,otp:otp,status:'verified'})
        if (user.length>0){
            await Otp.deleteOne({email:email,otp:otp})
            await UsersModel.updateOne({email:email}, {password:password});
            res.json({status:"success",message:"Password Update Success"})
        }
        else{
            res.json({status:"fail",message:"Invalid Request"})
        }

    }catch (error) {
        res.json({status:"fail",message:error})
    }
}