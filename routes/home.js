const express = require("express");
var router = express.Router();
var {Authorisation} = require("../controller/login");

router.get("/",async(req,res)=>{
    try{
        const auth_token = await req.headers.authorization;
        const logincredential = Authorisation(auth_token);
       if(auth_token === false){
            res.status(200).send("Invalid Token");
       } else{
        res.json(logincredential);
       }
    }
    catch(e)
    {
        console.log(e);
        res.status(400).send("Server Busy");
    }
})

module.exports = router;