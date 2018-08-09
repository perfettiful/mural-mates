const express = require('express');
const path = require("path");
const router = express.Router();

// Serve up static assets (usually on heroku)
router.use(express.static("client/public"));

// Send every request to the React app
// Define any API routes before this runs
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// Route for login page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/LoginPage.js"));
});

// Route for Register page
router.get("/create", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/CreateAccountPage.js"));
});

// Route for Home page
router.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/HomePage.js"));
});

// Route for Admin page
router.get("/admin", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/AdminMainPage.js"));
});

// Route for Admin-User page
router.get("/admin/users", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/AdminUserPage.js"));
});

// Route for Admin-Partner page
router.get("/admin/partners", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/AdminPartnerPage.js"));
});

// Route for Admin-Roles page
router.get("/admin/roles", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/pages/AdminRolePage.js"));
});


module.exports = router;

