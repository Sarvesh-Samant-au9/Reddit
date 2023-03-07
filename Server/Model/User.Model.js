const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trime: true,
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      maxlength: 20,
      trime: true,
    },
    email: {
      unique: true,
      required: [true, "Email is a required field"],
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email format",
      ],
    },
    isVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    karmaPoints: {
      postKarma: {
        type: Number,
        default: 0,
      },
      commentKarma: {
        type: Number,
        default: 0,
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      select: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
