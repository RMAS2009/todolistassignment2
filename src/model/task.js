const mongoose=require('mongoose');
const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    
},{timestamps:true,versionKey:false}
)

const taskModel=mongoose.model("Task",taskSchema);
module.exports=taskModel;