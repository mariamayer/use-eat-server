var express = require('express');
var router = express.Router();

const Recipe = require('../models/recipe');
const Review = require('../models/review');


router.post('/', (req, res, next) => {
  let recipeId = req.body.id;

  Recipe.findById(recipeId, (err, recipe) => {
    const newReview = new Review({
      content: req.body.content,
      stars: req.body.rating,
      author: req.body.author
    });

    recipe.reviews.push(newReview);

    recipe.save((err) => {
      res.json({
        message: 'New review created!'
      });
    });
  });
});

module.exports = router;
