const db = require("../models");

// Defining methods for the muralsController
module.exports = {

// FindAll method that gets all games in existance and sends a response in json format
  findAll: function(req, res) {
    db.Mural
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

// FindByID method to get a single game ID response
  findById: function(req, res) {
    db.Mural
      .findById(req.params.uniqueid)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

// Method to get a limited number of murals completed
// This is for the World Open Games component
  findOpenMurals: function(req,res) {
    db.Mural
    .find({private: false, pImg2: null})
    .sort({date: 'desc'})
    .limit(8)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },

// Method that posts games to the db
// This sends all game data available to server
  create: function(req, res) {
    db.Mural
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

// Method that updates a game based on the ID
// This is to make sure player2's image and user info are added to the game
  update: function(req, res) {
    db.Mural
      .findOneAndUpdate({ _id: req.params.uniqueid }, { $set: req.body})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

// Method to delete open games
// This will be used in the "Your Open Games" component 
// to get rid of games you don't want to leave open anymore
  remove: function(req, res) {
    db.Mural
      .findById({ _id: req.params.uniqueid })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};