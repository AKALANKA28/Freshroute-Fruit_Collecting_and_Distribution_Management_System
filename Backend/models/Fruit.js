// ./Backend/models/Fruit.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FruitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Fruit = mongoose.model("Fruit", FruitSchema);

module.exports = Fruit;
