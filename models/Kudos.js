const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Create a new Task Schema to map Mongo documents to an object in our node application
 */
var KudosSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  body: {
    type: String,
    trim: true,
    required: "Password is Required"
  },
  to: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  from: [
      {
          type: Schema.Types.ObjectId,
          ref: "User"
      }
  ]
});

const Kudos = mongoose.model("Kudos", KudosSchema);

module.exports = Kudos;
