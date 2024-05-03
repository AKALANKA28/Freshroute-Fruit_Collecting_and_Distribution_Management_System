const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = Notice;
