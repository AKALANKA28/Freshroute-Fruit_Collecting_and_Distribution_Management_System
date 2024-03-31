// .Backend/models/coordinator/Category.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  fruit: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
  },
  quality: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
