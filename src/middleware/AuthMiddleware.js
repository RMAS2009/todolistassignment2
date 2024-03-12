const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let token=req.headers['token'];
    jwt.verify(token,"123-abc",function(err,success)
    {
        if(err)
            res.status(401).json({status:"unauthorized"});
        else{
            let email=success['data'];
            req.email=email;
            next();
        }
    })
}