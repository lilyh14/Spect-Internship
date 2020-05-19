/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var MarketSchema = new Schema({
  /* Your code for a schema here */ 
  name: {type: String, required: true},
  published: {type: Boolean, required: true, default: false},
  removed: {type: Boolean, required: true, default: false},
  updated_at: Date,
  created_at: Date
});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
MarketSchema.pre('save', function(next) {
  var date = new Date();
  this.updated_at = date;
  if(!this.created_at){
    this.created_at = date;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
//Check out - https://mongoosejs.com/docs/guide.html#models
var Market = mongoose.model('Market', MarketSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Market;
