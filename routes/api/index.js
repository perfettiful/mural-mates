const router = require("express").Router();
const muralRoutes = require("./murals");
const apiRoutes = require("./apiRoutes")

// Mural routes
router.use("/v1", apiRoutes);
router.use("/", muralRoutes);


module.exports = router;
