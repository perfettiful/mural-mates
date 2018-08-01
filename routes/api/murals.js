const router = require("express").Router();
const muralsController = require("../../controllers/muralsController");

// Get route for "/"
router.route("/")
  .post(muralssController.create)
  .get(muralsController.findAll);

// Get route for "/newgame"
router
  .route("/newgame")
  .get(muralssController.findById)
  .put(muralssController.update)
  .delete(muralssController.remove);

// Get route for "/:uniqueid"
router
  .route("/:uniqueid")
  .get(muralssController.findById)
  .put(muralssController.update)
  .delete(muralssController.remove);

  // Get route for "/:uniqeid/mural"
router
.route("/:uniqueid/mural")
.get(muralssController.findById)
.put(muralssController.update)
.delete(muralssController.remove);

// Get route that matches with "/api/v1/:uniqueid"
router
  .route("/api/v1/:uniqueid")
  .get(muralssController.findById)
  .put(muralssController.update)
  .delete(muralssController.remove);

  // Post route that matches with "/api/v1"
router
.route("/api/v1")
.get(muralssController.findById)
.put(muralssController.update)
.delete(muralssController.remove);

// Put route that matches with "/api/v1/:uniqueid"
router
  .route("/api/v1/:uniqueid")
  .get(muralssController.findById)
  .put(muralssController.update)
  .delete(muralssController.remove);

module.exports = router;