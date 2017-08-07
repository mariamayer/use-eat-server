'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Review   = require('./review');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  preparation: {
    type: String,
    required: [true, 'The preparation is required']
  },
  notes: {
    type: String, default: ''
  },
  time: {
    type: Number,
    required: [true, 'The preparation time is required']
  },
  creator: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  image: {
    type: String, default: ''
  },
  ingredients: {
    type: Array,
    default: []
  },
  type: {
    type: Array,
    default: []
  },
  cuisine: {
    type: Array,
    default: []
  },
  servings: {
   type: Number,
   required: [true, 'The servings are required']
  },
  matches: {
   type: Number, default:0
  },
  reviews:{
   type: [Review.schema]
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
