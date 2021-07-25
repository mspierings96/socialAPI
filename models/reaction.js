const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reactionSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 1,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = reactionSchema;
