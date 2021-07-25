const mongoose = require("mongoose");
const reactionSchema = require("./reaction");

const Schema = mongoose.Schema;

const thoughtSchema = new Schema(
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
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
  }
);

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
