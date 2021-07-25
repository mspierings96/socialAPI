const thought = require("../models/thought.js");

const reactionController = {
  createReaction({ params, body }, res) {
    thought
      .findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true }
      )
      .then((dbUserData) => {
        if (dbUserData) {
          res.json();
        } else {
          res.status(404).json({ message: "no luck with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },
  deleteReaction({ params }, res) {
    thought
      .updateOne(
        { _id: params.thoughtId },
        { $pull: { reactions: { _id: params.reactionId } } }
      )
      .then((dbUserData) => {
        if (dbUserData) {
          res.json();
        } else {
          res.status(404).json({ message: "no luck with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },
};

module.exports = reactionController;
