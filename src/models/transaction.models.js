const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1 } = require("uuid");

const TransactionSchema = new Schema({
  uuid: { type: String, default: v1 },
  amount: { type: Number, default: 0 },
  type: { type: String, required: true },
  sender: { type: String },
  receiver: { type: String, required: true },
  accountNumber: { type: Number },
  oldBalance: { type: Number },
  newBalance: { type: Number },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
