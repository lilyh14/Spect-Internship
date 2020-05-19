/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  amount: {type: Number, required: false},
  created_at: Date
});


PaymentSchema.pre('save', function(next) {
  var date = new Date();
  this.updated_at = date;
  if(!this.created_at){
    this.created_at = date;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Payments = mongoose.model('Payments', PaymentSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Payments;