const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true,versionKey:false}
)

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;