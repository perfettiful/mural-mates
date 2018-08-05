const router = require("express").Router();
const muralsController = require("../../controllers/muralsController");

// Get route for "/api/"
router.route("/")
  .post(muralsController.create)
  .get(muralsController.findAll);

// Get route for "/newgame"
router
  .route("/newgame")
  .get(muralsController.findById)
  .post(muralsController.create);

  // Get route for "/:uniqeid/mural"
router
.route("/:uniqueid/mural")
.get(muralsController.findMuralById);


// Get route that matches with "/api/v1/:uniqueid"
router
  .route("/v1/game/:uniqueid")
  .get(muralsController.findById);

  // Post route that matches with "/api/v1"
router
.route("/v1/")
.post(muralsController.create);

// Put route that matches with "/api/v1/:uniqueid"
router
  .route("/v1/gameupdate/:uniqueid")
  .put(muralsController.update);

module.exports = router;