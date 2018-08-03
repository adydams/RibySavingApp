var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var savingSchema = new Schema({
    userId:  { 
      type: Schema.ObjectId, 
      ref: 'Users', 
      required: true
    },
    amount: {
        type: Number, 
        default: 0 , 
        required: true
    },
    duration: {
        type: String, 
        default: 12, 
        required: true
    },
    interest: { 
        type: Number, 
        default: 0.02 //2% interest 
    },
    lockStatus: {
        type: Boolean, 
        default: false
    },
    amountYieldedTillDate: {
        type: Number, 
        default: 0
    },
    savingsPlan: {
         type: String,
        enum : ['housing','PHCN', 'event'],
        default: 'event'
    },
    amountWithdraw: { 
        type: Number, 
        default: 0 
    },
    penaltyStatus: {
        type: Boolean, 
        default: false
    },
},{
    collection: 'savings',
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
});

const Savings = mongoose.model('Saving', savingSchema);
module.exports = Savings;