const db = require("../models");
const mongoose=require("mongoose");

// Defining methods for the muralsController
module.exports = {

  // FindAll method that gets all games in existance and sends a response in json format
  findAll: function (req, res) {
    db.Mural
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // FindByID method to get a single game ID response
  findById: function (req, res) {
    db.Mural
      .findById(req.params.uniqueid)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Method to get a limited number of murals not completed
  // This is for the World Open Games component
  findOpenMurals: function (req, res) {
    db.Mural
      .find(
        // {
        //   $or: [
        //     // Checking if two player games are completed
            {
              $and: [
                // { playerCount: 2 },
                { pImg2: null },
                { private: false }
              ]
            }

            // Checking if three player games are completed
            // {
            //   $and: [
            //     { playerCount: 3 },
            //     {
            //       $or: [
            //         // Open games will show up whether user is player 1 or player 2
            //         { pImg2: null },
            //         { pImg3: null },
            //       ]
            //     },
            //     { private: false }
            //   ]
            // }
        //   ]
        // }
      )
      .sort({ date: 'desc' })
      .limit(8)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Get incomplete murals by User
  findUserMurals: function (req, res) {
    db.Mural
      .find(
        // {
        //   $or: [
            // Checking if two player games are completed
            {
              $and: [
                // { playerCount: 2 },
                { playerId1: req.params.uniqueid },
                { pImg2: null }
              ]
            },

            // Checking if three player games are completed
          //   {
          //     $and: [
          //       { playerCount: 3 },
          //       {
          //         $or: [
          //           // Open games will show up whether user is player 1 or player 2
          //           { playerId1: req.params.uniqueid },
          //           { playerId2: req.params.uniqueid }
          //         ]
          //       },
          //       { $or: [
          //         { pImg2: null },
          //         { pImg3: null }
          //       ]}
          //     ]
          //   }
          // ]}
        )
      .limit(8)
      .sort({ date: 'desc' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Get COMPLETED murals by USER
  findCompletedMuralsByUser: function (req, res) {
    db.Mural
      .find(
        // {
        //   $or: [
            // Logic for 2 player game
            {
              $and: [
                // { playerCount: 2 },
                {
                  $or: [
                    { playerId1: req.params.uniqueid },
                    { playerId2: req.params.uniqueid }
                  ]
                },
                { pImg2: { $ne: null } }
              ]
            },

            // Logic for 3 player game
            // {
            //   $and: [
            //     { playerCount: 3 },
            //     {
            //       $or: [
            //         { playerId1: req.params.uniqueid },
            //         { playerId2: req.params.uniqueid },
            //         { playerId3: req.params.uniqueid }
            //       ]
            //     },
            //     {
            //       $and: [
            //         { pImg2: { $ne: null } },
            //         { pImg3: { $ne: null } }
            //       ]
            //     }
            //   ]
            // }] }
          )
      .limit(10)
      .sort({ date: 'desc' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  // Method to get all completed mural images 
  findCompletedMurals: function (req, res) {
    db.Mural
      .find(
        // {
        // $or: [
          // Checking 2 player games
          {
            $and: [
              // { playerCount: 2 },
              { pImg1: { $ne: null } },
              { pImg2: { $ne: null } }
            ]
          },

          // Checking 3 player games
        //   {
        //     $and: [
        //       { playerCount: 3 },
        //       { pImg1: { $ne: null } },
        //       { pImg2: { $ne: null } },
        //       { pImg3: { $ne: null } }
        //     ]
        //   }
        // ] }
      )
      .sort({ date: 'desc' })
      .limit(20)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  getAllCompletedGames: function (req, res) {
    // console.log(req.body.data);
    // const objectIds = req.body.data.map((element) => mongoose.Types.ObjectId(element) );
    // console.log(objectIds);
    db.Mural
      // .find({ "_id": { $in: objectIds } })
      .find(
        { pImg2: { $ne: null } })
      .sort({ date: 'desc' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  // Method that posts games to the db
  // This sends all game data available to server
  create: function (req, res) {
    db.Mural
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Method that updates a game based on the ID
  // This is to make sure player2's image and user info are added to the game
  update: function (req, res) {
    db.Mural
      .findOneAndUpdate({ _id: req.params.uniqueid }, { $set: req.body })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Method to delete open games
  // This will be used in the "Your Open Games" component 
  // to get rid of games you don't want to leave open anymore
  remove: function (req, res) {
    db.Mural
      .findById({ _id: req.params.uniqueid })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};