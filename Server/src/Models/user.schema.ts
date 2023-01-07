/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 4,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Email is necessary"],
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  karmaPoints: {
    postKarma: {
      type: Number,
      default: 0
    },
    commentKarma: {
      type: Number,
      default: 0
    }
  },
  avatar: {
    exists: {
      type: Boolean,
      default: false
    },
    imageLink: {
      type: String,
      trim: true,
      default: null
    },
    imageId: {
      type: String,
      trim: true,
      default: null
    }
  }
})

userSchema.pre("save", async function (next: any) {
  try {
    if (!this.isModified("password")) {
      return next()
    }
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
    return next()
  } catch (error) {
    return next(error)
  }
})





