const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
