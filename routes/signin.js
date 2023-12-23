const express = require("express");
var router = express.Router();
const client= require("../redis");
const {checkuser } = require("../controller/login")
const {InsertVerifyUser} = require("../controller/signin");

client
    .connect()
    .then(()=>{
        console.log("Connected To Redis");
    })
    .catch((e)=>{
        console.log(e);
    });

router.get('/:token',async(res,req)=>{
    try{
        const response = await InserSignUpUser(req.params.token);
        res.status(200).send(response);
    }catch(e){
        console.log(e);
        res.status(500).send(`<html><body>
        <h3>Registration Failed</h3>
        <h4>Link Expired..</h4>
        <p>Thanks and Regards</p></body>
        </html>`);
    }
})

router.post('/verify',async(req,res)=>{
    try{
    const{name,email,password} =await req.body;
    console.log(name,email,password);
    const registercerential = await checkuser(email);
    if(registercerential === false){
        await InsertVerifyUser(name,email,password);
        res.status(200).send(true);
    }
    else if(registercerential === true){
        res.status(200).send(false);
    }
    else if(registercerential=== "Server Busy")
    {
        res.status(500).send("Server Busy");
    }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;