const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/admin/users"
);

const userSeed = [
  {
    firstName: "Admin",
    lastName: "Admin",
    emailAddress:"kimberly@mvp.com",
    status:"active",
    date: new Date(Date.now())
  },
  {
    firstName: "Rebecca",
    lastName: "Owen",
    emailAddress:"rebecca.owne@bain.com",
    password:"1234567890",
    status:"pending",
    date: new Date(Date.now())
  }
];

db.User
  .remove({})
  .then(() => db.User.profile.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
