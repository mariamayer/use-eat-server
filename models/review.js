const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  content:{
    type: String,
  },
  stars:{
    type: Number,
  },
  author:{
    type: String,
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
