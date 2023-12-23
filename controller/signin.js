const User = require("../models/User");
const {sendMail} = require("./sendmail");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const VerifyUser = require("../models/VerifyUser");
const dotenv = require("dotenv");
dotenv.config();

async function InsertVerifyUser(name,email,password){
    try{
        const salt = await bcrypt.genSalt(10);
        const hassedpass = await bcrypt.hash(password,salt);
        const token  = generateToken(email);

        const newUser = new VerifyUser({
            name:name,
            email:email,
            password:hassedpass,
            token:token,
        });

        const activationlink =`https://localhost:4000/signin/${token}`;
        const content =`<h3>Welcome To The App</h3>
        <h4>Click the below link to Activate..</h4>
        <a href="${activationlink}" >Click Here</a>
        <p>Thanks and Regards</p>`;

        await newUser.save();
        sendMail(email,"VerifyUser",content);
    }
    catch(error){
        console.log(error);
    }
}

function generateToken(email)
{
    const token = jwt.sign(email,process.env.signin_secret_token);
    return token;
}




async function InserSignUpUser(token){
    try{
    const userverify = await VerifyUser.findOne({token:token});
    if(userverify){
        const newUser = new User({
            name: userverify.name,
            email:userverify.email,
            password:userverify.password,
            forgetpass:{}

        });
        await newUser.save();
        await userverify.deleteOne({token:token});
        const content =`<h2>Registration Successfull</h2>
        <h3>Welcome To The App</h3>
        <h4>You are Regestered Successfully...</h4>
        <p>Thanks and Regards</p>`;
        sendMail(newUser.email,"Registration Successfull",content);
    
    }
    return `<h2>Registration Failed</h2>
        <h4>Link Expired...</h4>
        <p>Thanks and Regards</p>`;
    }
    catch(e){
        console.log(e);
        return `<html><body><h3>Registration Failed</h3>
        <h4>Unexpected happened...</h4>
        <p>Thanks and Regards</p></body></html>`;
    }
}

module.exports={InsertVerifyUser,InserSignUpUser};