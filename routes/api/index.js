const router = require("express").Router();
const muralRoutes = require("./murals");

// Mural routes
router.use("/murals", muralRoutes);

module.exports = router;
