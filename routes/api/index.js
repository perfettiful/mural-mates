const router = require("express").Router();
const muralRoutes = require("./murals");

// Mural routes
router.use("/", muralRoutes);

module.exports = router;
