const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Create a new Task Schema to map Mongo documents to an object in our node application
 */
var UserSchema = new Schema({
  name: String 
});

const User = mongoose.model("User", UserSchema);

module.exports = User;