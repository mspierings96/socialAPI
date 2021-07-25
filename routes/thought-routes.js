const router = require("express").Router();

const {
  createReaction,
  deleteReaction,
} = require("../controllers/reaction-controller");

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../controllers/thought-controller");

router.route("/").post(createThought).get(getAllThoughts);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
