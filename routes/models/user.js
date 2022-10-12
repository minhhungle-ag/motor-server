const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,

  info: {
    name: String,
    age: Number,
    address: String,
    phone: String,
    email: String,
  },

  cartList: [
    {
      _id: Schema.Types.ObjectId,
      color: String,
      chassis: String,
      brake_pads: String,
      amount: Number,
    },
  ],

  username: String,
  password: String,
});

module.exports = model("User", userSchema);
