var express = require("express");
const app = express();
const connectdb = require("./db");
const signinroute = require("./routes/signin");
const loginroute = require("./routes/login");
const homeroute = require("./routes/home");
const cors = require("cors");

app.use(express.json());
app.use(cors({origin:"*"}));
connectdb();

app.get('/',(req,res)=>{
    res.send("200");
});

app.use('/signin',signinroute);
app.use('/login',loginroute);
app.use('/home',homeroute);

app.listen(8000,()=>{
    console.log("Server Running at Port :8000");
});