/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var Student_ProfileSchema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: false},
  email: {type: String, required: false},
  description: {type: String, required: false},
  skills1: {type: String, required: false},
  skills2: {type: String, required: false},
  skills3: {type: String, required: false},
  updated_at: Date,
  created_at: Date
});


Student_ProfileSchema.pre('save', function(next) {
  var date = new Date();
  this.updated_at = date;
  if(!this.created_at){
    this.created_at = date;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Student_Profile = mongoose.model('Student Profile', Student_ProfileSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Student_Profile;