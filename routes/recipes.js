const express = require('express');
const router = express.Router();
const unirest = require('unirest');

const Recipe = require('../models/recipe');

/* GET recipes. */
router.get('/', (req, res, next) => {
  let regex=[];
  const ingredients=req.query.query.split(',');
  ingredients.forEach(function(element) {
      regex.push(new RegExp(element));
  });
  Recipe.find( {ingredients: { $in: regex }}, (err, recipes) => {
      if (err) { return next(err) }
      res.json(recipes);
  });

});

/* GET ingredients. */
router.get('/ingredients/:name', (req, res, next) => {
  unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?metaInformation=false&number=10&query="+req.params.name)
  .header("X-Mashape-Key", "V1c2mcwo8zmshvU868yfsk0E2O3yp1Oan6gjsn0gzV25AP61OQ")
  .header("Accept", "application/json")
  .end(function (result) {
    res.json(result.body);
  });
});

/* GET Facts. */
router.get('/facts', (req, res, next) => {
  const ingredients=req.query.query;
  unirest.post("https://trackapi.nutritionix.com/v2/natural/nutrients")
  .header("x-app-id", "7d240a70")
  .header("x-app-key", "86f9379d7586e0e28107c37731976a9a")
  .header("Accept", "application/json")
  .send({ "query":ingredients,
  "timezone": "US/Eastern"})
  .end(function (result) {
    res.json(result.body);
  });
});

/* POST new recipe */
router.post('/', (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    preparation:req.body.preparation,
    ingredients:req.body.ingredients.split(','),
    time:req.body.time,
    creator:req.body.user,
    servings: req.body.servings,
    notes: req.body.notes || '',
    image: req.body.image || '',
    cuisine: req.body.cuisine || '',
    type: req.body.type || ''
  });

  recipe.save((err) => {
    if (err) {
      res.json({message:err.message});
      return;
    }

    res.json({
      message: 'New recipe created!',
      id: recipe._id
    });
  });
});

/* GET a single recipe. */
router.get('/:id', (req, res) => {

  Recipe.findById(req.params.id, (err, recipe) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(recipe);
    });
});

module.exports = router;
