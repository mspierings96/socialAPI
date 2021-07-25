const thought = require("../models/thought.js");

const thoughtController = {
  createThought({ body }, res) {
    thought
      .create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getAllThoughts(req, res) {
    thought
      .find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById({ params }, res) {
    thought
      .findOne({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  updateThought({ params, body }, res) {
    thought
      .findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (dbUserData) {
          res.json();
        } else {
          res.status(404).json({ message: "no luck with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    thought
      .findOneAndDelete({ _id: params.id })
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

module.exports = thoughtController;
