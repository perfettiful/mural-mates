const router = require("express").Router();
const muralsController = require("../../controllers/muralsController");

// Get route for "/api/"
router
.route("/")
  .post(muralsController.create)
  .get(muralsController.findAll);

// Get route for "/newgame"
router
  .route("/newgame")
  .get(muralsController.findById)
  .post(muralsController.create);

// Get route that matches with "/api/v1/:uniqueid"
router
  .route("/v1/game/:uniqueid")
  .get(muralsController.findById);

  // Get route for final mural that matches with "/api/v1/mural"
router
  .route("/v1/game/mural/:uniqueid")
  .get(muralsController.findById);
  
  // Post route that matches with "/api/v1"
router
.route("/v1/")
.post(muralsController.create);

// Put route that matches with "/api/v1/:uniqueid"
router
  .route("/v1/gameupdate/:uniqueid")
  .put(muralsController.update);

router
.route("/v1/openmurals")
.get(muralsController.findOpenMurals);

//Get route for all completed murals
router
.route("/v1/murals/")
.get(muralsController.findCompletedMurals);

//Get route for all completed murals by specific user
router
.route("/v1/murals/:uniqueid")
.get(muralsController.findCompletedMuralsByUser);

//Get route for all open murals by user
router
.route("/v1/openmurals/:uniqueid")
.get(muralsController.findUserMurals);


module.exports = router;