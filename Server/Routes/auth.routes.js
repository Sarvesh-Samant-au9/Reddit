const express = require("express");
const {
  registerUser,
} = require("../Controller/Authentication/register.controller.js");

const authRouter = express();
authRouter.route("/register").post(registerUser);
module.exports = authRouter;
