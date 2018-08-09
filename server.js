const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const morgan = require("morgan");



const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// configure using our exported passport function.
// we need to pass the express app we want configured!
// order is important! you need to set up passport
// before you start using it in your routes.
require('./passport')(app);

// Route for retrieving all Partner from the db
app.get("/admin/partners", function(req, res) {
  // Find all Notes
  db.Partner.find({})
    .then(function(dbPartner) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbPartner);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Route for retrieving all Users from the db
app.get("/admin/users", function(req, res) {
  // Find all Users
  db.User.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});


// Route for retrieving all Users from the db
app.get("/admin/role", function(req, res) {
  // Find all Users
  db.Role.find({})
    .then(function(dbRole) {
      // If all Users are successfully found, send them back to the client
      res.json(dbRole);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactmurallist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});