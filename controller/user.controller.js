const User= require('../models/userModel');
const objectConverter= require('../utils/objectConverter');


exports.findAll= async(req,res)=>{
    try{

       let userQuery= {};
       let userTypeReq= req.query.userType;
       let userStatusReq= req.query.userStatus;

       if(userTypeReq){
           userQuery.userType= userTypeReq
       }
       if(userStatusReq){
           userQuery.userStatus= userStatusReq;
       }

       const users= await User.find(userQuery);
       res.status(200).send(objectConverter.userResponse(users));

    }catch(err){
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.findById= async (req,res)=>{
    const userIdReq= req.params.userId;
    try{
        const user= await User.findOne({userId:userIdReq});
        if(!user){
            res.status(404).send("User does not exist");
        }

        var userResObj= {
            name: user.name,
            age: user.age,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus
        }
        res.status(200).send(userResObj);

    }catch(err){
        res.status(500).send({
            message: "internal server error"
        })
    }
}


exports.update = async (req,res)=>{

    const userIdReq= req.params.userId;
    try{
        const user= await User.findOne({userId:userIdReq});
        if(!user){
           return res.status(404).send(`user with ${userIdReq} does not exist`);
        }

        const admin= await User.findOne({
            userType:"Admin"
        });
        
        //for updating
            
        user.name= req.body.name?req.body.name:user.name;
        user.email= req.body.email?req.body.email:user.email;
        user.userType= req.body.userType?req.body.userType:user.userType;

            if(admin.userId==req.userId){
                user.userStatus= req.body.userStatus;
            }
          
        const updatedUser=await user.save();

        var userResObj= {
            name: updatedUser.name,
             userId: updatedUser.userId,
             email: updatedUser.email,
             userType: updatedUser.userType,
             userStatus: updatedUser.userStatus
        }

        res.status(202).send(userResObj);

    }catch{
        res.status(404).send("internal server error");
    }

}


