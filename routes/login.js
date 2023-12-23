const express = require("express");
const { AuthenticateUser } = require("../controller/login");
var router = express.Router();


router.post("/",async(req,res)=>{
try{
    const {email,password} = await req.body;
    var logincrendential = await AuthenticateUser(email,password);
    console.log(logincrendential);
    if(logincrendential==="Invalid User"){
        res.status(200).send("Invalid Username or password");
    }else if(logincrendential==="Server Busy"){
        res.status(200).send("Server Busy");
    }else{
        res.status(200).json({token:logincrendential.token});
    }
}
catch(error){
    console.log(error);
}
})

module.exports=router;