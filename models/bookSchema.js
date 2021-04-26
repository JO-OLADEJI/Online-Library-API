const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 512
  },
  genre: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  author: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: (new Date().getFullYear())
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  }
});


module.exports = mongoose.model('Books', bookSchema);