const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    JoinedOn:{
        type:Date,
        default:Date.now()
    },
    token:{
        type:String,
        
    },
    forgetpass:{
        time:Date,
        otp:String        
    }
},
{
    collection:"User"
});

module.exports=mongoose.model("User",UserSchema);