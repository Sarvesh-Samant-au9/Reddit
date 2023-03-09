const express = require("express");
const {
  loginUser,
} = require("../Controller/Authentication/login.controller.js");
const upload = require("../Middleware/imageUpload.js");
const {
  registerUser,
  updatePassword,
  forgotPassword,
  updateProfile,
  resetPassword,
  getUserInfo,
} = require("../Controller/Authentication/register.controller.js");
const { auth } = require("../Middleware/auth.js");
const verifyAndOnboarding = require("../Controller/Verification/verify.controller.js");

const authRouter = express();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/update-password/:user").put(updatePassword);
authRouter.route("forgot-password").post(forgotPassword);
authRouter.route("/reset-password/:token").put(resetPassword);
authRouter.route("/").get(auth, getUserInfo);
authRouter.route("/password").put(auth, updatePassword);
authRouter
  .route("/update-profile")
  .put(auth, upload.single("avatar"), updateProfile);
authRouter
  .route("/verify/:token")
  .post(upload.single("/avatar"), verifyAndOnboarding);
// authRouter.route("")
module.exports = authRouter;

//   resetPassword,
//   getUserInfo,
//   forgotPassword,
//   updateProfile,
