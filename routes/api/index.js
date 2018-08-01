const router = require("express").Router();
<<<<<<< HEAD
const muralRoutes = require("./murals");

// Mural routes
router.use("/murals", muralRoutes);
=======
const bookRoutes = require("./books");

// Book routes
router.use("/books", bookRoutes);
>>>>>>> 1066f796fa490dcd911926950d67d3f9fc7875f2

module.exports = router;
