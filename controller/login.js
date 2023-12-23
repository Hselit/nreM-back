const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const client = require("../redis");
dotenv.config();
async function checkuser(email)
{
    try{
        const user =await User.findOne({email:email});
        
        if(user){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error)
    {
        return "Server Busy";
    }
}

async function AuthenticateUser(email,password){
    try{
        const usercheck = await User.findOne({email:email});
        console.log(usercheck);
        const validpass = await bcrypt.compare(password,usercheck.password);
        if(validpass){
            const token = jwt.sign({email},process.env.login_secret_key);
            const response ={
                id:usercheck._id,
                name:usercheck.name,
                email:usercheck.email,
                token:token,
                status:true
            };
        await client.set(`key-${email}`,JSON.stringify(response));
        await User.findByIdAndUpdate({email:usercheck.email},{$set:{token:token}},{new:true});
        return response;
        }
        return "Invalid User";
    }
    catch(error){
        console.log(error);
        return "Server Busy";
    }
}

async function Authorisation(token){
    try{
        const decodedtoken = jwt.verify(token,process.env.login_secret_key);
        if(decodedtoken){
            const email = decodedtoken.email;
            const auth = await client.get(`key-${email}`);
            if(auth){
                const data = JSON.parse(auth);
                return data;
            }
            else{
                const data = await User.findOne({email:email});
                return data;
            }
        }
        return false;
    }
    catch(error){
        console.log(error);
    }
}

module.exports= {checkuser,AuthenticateUser,Authorisation};