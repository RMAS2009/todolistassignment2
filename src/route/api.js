const express=require('express');
const userController=require('../controller/userController');
const AuthMiddleware=require('../middleware/AuthMiddleware');
const {createTask,updateTask,deleteTask,readTask,updateStatus}=require('../controller/taskController');
const router=express.Router();



// user registration
router.post("/registration",userController.registration);

// user login
router.post("/login",userController.login);

// password reset with email
router.get("/verifyEmail/:email",userController.verifyEmail);
router.get("/verifyOTP/:email/:otp",userController.verifyOTP);
router.get("/passwordReset/:email/:otp/:password",userController.passwordReset)


// After Login
router.get("/profileDetails",AuthMiddleware,userController.profileDetails);
router.post("/profileUpdate",AuthMiddleware,userController.profileUpdate);



// for task management
router.post("/task/create",AuthMiddleware,createTask);
router.post("/task/update/:id",AuthMiddleware,updateTask);
router.get("/task/read",AuthMiddleware,readTask);
router.delete("/task/delete/:id",AuthMiddleware,deleteTask);

// cancel or complete mark for todo
router.post("/task/updateStatus/:id",AuthMiddleware,updateStatus)


module.exports=router;