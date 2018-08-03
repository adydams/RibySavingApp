const UsersModel = require('../models/users');
const SavingsModel = require('../models/savings');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const emailManager = require('../middlewares/mailer');


function Save (req, res){
    var saveObject = {
        userId: req.body.userId,
        amount: req.body.amount,
        duration: req.body.duration, 
        savingsPlan: req.body.savingsPlan
    };

    (new SavingsModel(saveObject)).save((err, object) => {
            console.log(err)
            if (err) {
                // drop the error info 
                res.status(422).json({'status': false, 'message': 'An Error Occured', payload: err})
            } else {
                 emailManager.sendMail({
                                        from:'support@riby.me',
                                        to:userCreationObject.email,
                                        subject:'Account Creditted',
                                        html: emailManager.registerEmailBody(userCreationObject)
               })
               
               return res.status(201).json({'status': true, 'message': 'Success', payload: object});
            }
        });
};
function Withdraw (req, res){
    var saveObject = {
         saveId: req.body.saveId,
         amountToWithdraw: req.body.amountToWithdraw,
    }
    SavingsModel.findById( req.body.saveId, (error, save) => {
        if(error) return res.json({'status': false, 'message': 'An Error Occured', payload: error});
           //return res.send({save})
            let amount = save.amount;
                if(amount < saveObject.amountToWithdraw ){ 
                    return res.status(400).json({"status": false, "message":"You can't withdraw more than your saving"})
                }
                else{ 
                    //check for duration
                    let dateCreated =save.created_at;
                    let date =new Date()

                    // calculating if duration has elapsed
                    let durationValue = (dateCreated.getMonth() - date.getMonth());
                   
                    if (durationValue < save.duration){
                        return res.json({'status': true, 'message': 'Withdrawal will attract penalty, You have not exceeded duration'});
                    }
                    return res.json({'status': true, 'message': 'Withdrawal is successful'});
                }
                
        
 });

}

function calculateInterest (req, res){
    
}


module.exports = {
    Save: Save,
    Withdraw: Withdraw
    
}