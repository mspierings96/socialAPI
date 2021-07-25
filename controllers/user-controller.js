const user = require("../models/user.js");

const userController = {
  getAllUsers(req, res) {
    user
      .find({})
      .populate("thoughts")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    user
      .findone({ _id: params.id })
      .populate("friends")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  updateUser({ params }, res) {
    user
      .findOneandUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (dbUserData) {
          res.json();
        } else {
          res.status(404).json({ message: "no luck with this id!" });
        }
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    user
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

  createUser({ body }, res) {
    user
      .create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addNewFriend({ params }, res) {
    user
      .findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      )
      .then(() =>
        user.findOneAndUpdate(
          {
            _id: params.friendId,
          },
          {
            $push: { friends: params.userId },
          },
          { new: true }
        )
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

  deleteFriend({ params }, res) {
    user
      .updateOne(
        { _id: params.userId },
        { $pull: { friends: params.friendId } }
      )
      .updateOne(
        { _id: params.friendId },
        { $pull: { friends: params.userId } }
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

module.exports = userController;
