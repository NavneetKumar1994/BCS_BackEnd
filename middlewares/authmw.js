const jwt= require('jsonwebtoken');
const secretKey= require('../configs/token.configs');
const User= require('../models/userModel')


verifyToken= (req,res,next)=>{

    let token= req.headers['x-access-token'];

    if(!token){
        return res.status(403).send('No token provided');
    }

    jwt.verify(token,secretKey.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send('Unauthorized');
        }

        req.userId= decoded.id;
        next(); 
    });
    
}

isAdmin= async (req,res,next)=>{
    const user= await User.findOne({
        userId:req.userId
    });
    if(user && user.userType=="Admin"){
       next();
    }else{
        res.status(200).send("Authorized by Admin only")
    }
}

checkForUser= async (req,res,next)=>{
    const loggedUser= await User.findOne({
        userId: req.userId
    })
    const userTOUpdate= await User.findOne({
        userId: req.params.userId
    })
    if(loggedUser && loggedUser.userType=="Admin"){
        next();
    }else if(loggedUser && (loggedUser.userId==userTOUpdate.userId)){
        next();
    }else{
        res.status(403).send({
            message:"Invalid Credential."
        });   
    }
} 




const authCheck= {
    verifyToken:verifyToken,
    isAdmin:isAdmin,
    checkForUser:checkForUser,
}

module.exports= authCheck