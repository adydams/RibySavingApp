const UsersModel = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const emailManager = require('../middlewares/mailer');

//function to display all users
function List (req, res){
    UsersModel.find((err, users)=>{
        if (err) {
            return res.status(422).json({'status': false, 'message': 'An Error Occured'})
        }
            return res.status(200).send(users)
    })
};

//function to register a new client
function Register (req, res){
    var userCreationObject = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password)  
    };
        (new UsersModel(userCreationObject)).save((err, object) => {
            console.log(err)
            if (err) {
                // drop the error info 
                res.status(422).json({'status': false, 'message': 'An Error Occured', payload: err})
            } else {
                
                 var newObject = {
                    name: object.name,
                    email: object.email,
                    phoneNumber: object.phoneNumber,
                    password: bcrypt.hashSync(req.body.password)  
                };
                    //sending emails to registered clients for created account
                        userCreationObject.password = req.body.password;
                            emailManager.sendMail({
                                        from:'support@riby.me',
                                        to:userCreationObject.email,
                                        subject:'Account Successfully Created',
                                        html:emailManager.registerEmailBody(userCreationObject)
               })
               
                        return res.status(201).send({'message':object }).json({'status': true, 'message': 'Success'});
            }
        });
}



function Login (req, res){
    UsersModel 
        .findOne({ email: req.body.email })
        .exec(function(error, User) { 
            if (error) {
                res.json({'status': false, 'message': 'An Error Occured', payload: null})
            } 

            if (bcrypt.compareSync(req.body.password, User.password) == false) {
                res.status(400).json({'status': false, 'message': 'Incorrect login credentials, please try again.', payload: null})
            }

            User.password = "";
            console.log(User)
            var token = jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 60
            }); 

            var payload = [{}];
            payload.token;
            payload.user_details;
            res.status(200).json({'status': true, 'message': 'Success', "token": token, "users":{User}})
        });

}


module.exports = {
    Register: Register,
    Login: Login,
    List: List
}