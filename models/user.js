const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //   thoughts: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "thoughts",
    //     },
    //   ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("thoughts", {
  ref: "thought",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
