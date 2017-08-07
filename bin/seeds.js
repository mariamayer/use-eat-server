const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cook-app');

const Recipe = require('../models/recipe');

const recipes = [
  {
    name: 'Classic Chinese Chow Mein',
    preparation:'Heat a large pan or wok on high heat. Add two tablespoons of canola oil to the pan and cook the cabbage. Cook 2-3 minutes until wilted, add the garlic and cook for an additional 30 seconds. Add the soy sauce, sweet soy sauce, oyster sauce and water and bring to a boil for 1 minute. Add in the pasta and bean sprouts and toss to coat.Serve immediately',
    ingredients:[
      '2 tablespoons canola oil',
      '1/4 head cabbage',
      '2 cloves garlic',
      '2 tablespoons sweet sauce',
      '2 tablespoons soy sauce',
      '4 tablespoons oyster sauce',
      '1 cup water',
      '12 ounces chow mein noodles',
    ],
    time:20,
    servings: 4,
    notes:'To make homemade Kecap Manis, add 1 1/2 teaspoons of soy sauce and 1 1/2 teaspoons of molasses or dark brown sugar with a tiny pinch of ground anise. This is a decent substitute, but if you can get the original the flavor will be even deeper',
  }
];

Recipe.create(recipes, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((recipes) => {
    console.log(recipes.name)
  });
  mongoose.connection.close();
});
