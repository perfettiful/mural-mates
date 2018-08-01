const router = require("express").Router();
const muralsController = require("../../controllers/muralsController");

// Matches with "/api/murals"
router.route("/api/game")
  .post(muralssController.create)
  .get(muralsController.findAll);

// Matches with "/api/murals/:id"
router
  .route("/:uniqueid")
  .get(muralssController.findById)
  .put(muralssController.update)
  .delete(muralssController.remove);

// Matches with "/api/murals/:id"
router
  .route("/:uniqueid/mural")
  .get(muralssController.findById)
  .put(muralssController.update)
  .delete(muralssController.remove);

module.exports = router;