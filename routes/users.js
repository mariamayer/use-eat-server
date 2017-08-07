var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt');
var router = express.Router();

const User = require('../models/user');
const Recipe = require('../models/recipe');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(theUser, (err) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }
    res.status(200).json(req.user);
    });
})(req, res, next); });

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  if (!username || !password || !name) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }
  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const theUser = new User(
      { username, password: hashPass,name}
    );

    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }
        res.status(200).json(req.user);
      });
    });
  });
});

router.post('/logout', (req, res, next) => {
  req.logout(); res.status(200).json({ message: 'Success' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.get('/recipes/:id', (req, res, next) => {
  Recipe.find( {creator: req.params.id}, (err, recipes) => {
      if (err) { return next(err) }
      res.json(recipes);
  });
});

module.exports = router;
