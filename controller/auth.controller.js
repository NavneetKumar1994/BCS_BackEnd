const User= require('../models/userModel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const secretConfig= require('../configs/token.configs');


exports.signup= async (req,res)=>{

    // var userTypeReq= req.body.userType;
    // var userStatusReq= "Approved";
    // if(userTypeReq!='Visitor' && userTypeReq!="Admin"){
    //     userStatusReq= "Pending";
    // }
    const UserObj={
        username: req.body.username,
        age: req.body.age,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password,8),
        // userType: userTypeReq,
        // userStatus: userStatusReq
    };
    try{
        const user= await User.create(UserObj);
        res.status(200).send({
        username: user.username,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber,
        // userType: user.userType,
        // userStatus: user.userStatus
        });

    }catch(err){
         console.log("error in creating",err.message);
         res.status(500).send({
             message: 'internal server error'
         });
    }
}


exports.signin= async (req,res)=>{
    const user= await User.findOne({email: req.body.email})

    if(user==null){
        return res.status(400).send({
            message: "User does not exist in system."
        })
    }
    // if(user.userStatus!="Approved"){
    //     return res.status(200).send({
    //         message: `Your status is still ${user.userStatus}`
    //     })
    // }
    if(!bcrypt.compareSync(req.body.password,user.password)){
        return res.status(200).send({
           message: "Invalid password!"
        })
    }

    /**
     * create a token for user
     */
    const token= jwt.sign({id: user.userId},secretConfig.secret,{expiresIn:2000});
    res.status(200).send({
        username: user.username,
        age: user.age,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    });
    //get this token detail on "jwt.io"
}





