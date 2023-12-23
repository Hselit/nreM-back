const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_pass,
  },
});

async function sendMail(toemail,subject,content){
    const mailoption = {
        from: "hselit06@gmail.com",
        to:toemail,
        subject:subject,
        html:content
    };

    transporter.sendMail(mailoption,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Mail Sended Successfully",info.response);
        }
    });
}

module.exports={ sendMail};