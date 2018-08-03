//Require nodemailer
var nodemailer = require('nodemailer');


function sendMail(mailOptions){

   var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: 'adydams@gmail.com',
       pass: '@beautiful1989'
   }
   });

   transporter.sendMail(mailOptions, function(error, info){
   if (error) {
       console.log(error);
   } else {
       console.log('Email sent: ' + info.response);
   }
   });
}

function registerEmailBody(bodyObject){
   return  `
   <h3>Hello ${bodyObject.name},</h3>
   <p>Congratulations Your account have been created successfully</p>
   <p>Account Details<br/>
   Name: <span style="color:blue">${bodyObject.name}</span><br/>
   Email: <span style="color:blue">${bodyObject.email}</span><br/>
   Phone: <span style="color:blue">${bodyObject.phoneNumber}</span><br/>
   Password: <span style="color:blue">${bodyObject.password}</span><br/>
   </p>

   <p><a href="http://localhost:3000/">Visit Savers App by clicking on the link</a></p>
`
}
module.exports = {
    sendMail, 
    registerEmailBody
}