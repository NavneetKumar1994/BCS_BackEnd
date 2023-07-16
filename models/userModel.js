const mongoose= require('mongoose');
const validator= require('validator');

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required:true,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error ("invalid output");
            }
        }
    },
    email:{
        type: String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("invalid Email");
            }
        }
    },
    phoneNumber:{
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
    },

    password:{
        type: String,
        required: true
    },

    // userType:{
    //     type: String,
    //     required: true,
    //     default: "Visitor"
    // },
    // userStatus:{
    //     type: String,
    //     required: true,
    //     default: "Approved"
    // },
    ticketsCreated:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    },
    ticketsAssigned:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    }
})


module.exports= mongoose.model("user",userSchema);