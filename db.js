const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const db = async ()=>{
    try {
        await mongoose.connect(process.env.MongoDb_url);
        console.log("Connected to MongoDb..");
    }
    catch(error){
        console.log(error);
    }
}

module.exports= db;