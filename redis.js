const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient=()=>{
    return redis.createClient();
};

const client = redisClient();
client.on("error",(err)=>{
    console.log(err);
});

client.on("connect",()=>{
    console.log("Connected to Redis");
});
client.on("end",()=>{
    console.log("Redis Connection Ended");
});
client.on("SIGQUIT",(err)=>{
    client.quit();
});

module.exports = client;