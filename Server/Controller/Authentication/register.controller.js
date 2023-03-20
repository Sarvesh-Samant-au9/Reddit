const tryCatch = require("../../Middleware/tryCatch.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const UserModel = require("../../Model/User.Model.js");
const htmlReader = require("../../Utils/htmlReader.js");
const sendEmail = require("../../Utils/sendMail.js");
const Handlebars = require("handlebars");
const ErrorHandler = require("../../Utils/ErrorHandler.js");
// const path = require("path");

// /api/v1/auth/register
// User Registration and sending Email
const registerUser = tryCatch(async (req, res, next) => {
  let name = req.body.name;
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;

  if (!name || !email || !userName || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  let user = await UserModel.findOne({
    email: email.toLowerCase(),
  });
  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }
  user = await UserModel.findOne({
    userName: userName.toLowerCase(),
  });
  if (user) {
    return next(new ErrorHandler("Username already taken"));
  }
  user = new UserModel({
    name,
    email: email.toLowerCase(),
    password,
    userName: userName.toLowerCase(),
  });
  user.password = await bcrypt.hash(password, 10);

  const verificationUrlToken = crypto.randomBytes(20).toString("hex");
  user.verificationToken = crypto
    .createHash("sha256")
    .update(verificationUrlToken)
    .digest("hex");
  const proto =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";
  // const verificationUrl = ``;
  const verificationURL = `${proto}://${req.get(
    "host"
  )}/verify/${verificationUrlToken}`;

  const htmlTemplate = await htmlReader(
    path.join(__dirname, "..", "..", "Email", "verification.html")
  );
  const handleBarTemplate = Handlebars.compile(htmlTemplate);
  const replace = { verificationURL };
  const html = handleBarTemplate(replace);
  try {
    await sendEmail({
      to: user.email,
      subject: "Authorize",
      html,
    });
  } catch (error) {
    user.verificationToken = undefined;
    await user.save();
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
  await user.save();
  let displayUser = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    userName: user.userName,
  };
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      return next(new ErrorHandler("Registration went wrong", 404));
    }
    return res.status(200).json({
      success: true,
      message: "User Registered",
      token,
      user: displayUser,
    });
  });
});

// /api/v1/auth/updatepassword/:user
const updatePassword = tryCatch(async (req, res, next) => {
  const userParams = req.params.user;
  const user = await UserModel.findById(userParams).select("+password");
  // console.log(user)
  if (!user) {
    return next(new ErrorHandler("User unavailable", 400));
  }
  let { newPassword, currentPassword } = req.body;
  const matchPassword = await bcrypt.compare(currentPassword, user.password);
  if (!matchPassword) {
    return next(new ErrorHandler("Password do not match", 404));
  }
  newPassword = newPassword.trim();
  if (newPassword.length < 10) {
    return next(new ErrorHandler("Password is too short", 404));
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Password Updated",
  });
});

// /api/v1/auth/:userId

const getUserInfo = tryCatch(async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  return res.status(200).json({
    success: true,
    user,
  });
});

// /api/v1/auth/forgot-password
const forgotPassword = tryCatch(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not found/registered", 400));
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const htmlTemplate = await htmlReader(
    path.join(__dirname, "..", "..", "Email", "resetPassword.html")
  );
  // console.log(resetURL);
  const handleBarTemplate = Handlebars.compile(htmlTemplate);
  const replace = { resetURL };
  const html = handleBarTemplate(replace);
  // console.log(html, "HERE");
  try {
    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
  await user.save();
  return res.status(200).json({
    success: true,
    message: "Email Sent",
  });
});

// /api/v1/auth/reset-password
const resetPassword = tryCatch(async (req, res, next) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await UserModel.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or expired", 400)
    );
  }
  if (!req.body.password) {
    return next(new ErrorHandler("Enter all the required Fields", 404));
  }
  if (req.body.password.length < 6) {
    return next(
      new ErrorHandler("Password needs to be of atleast 6 characters")
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password do not match", 400));
  }
  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  // resetPasswordToken
  await user.save();
  return res.status(200).json({
    success: true,
    messgae: "Password reset complete",
  });
});

// /api/v1/auth/update-profile
const updateProfile = tryCatch(async (req, res, next) => {
  let { userName } = req.body;
  let name = req.body.name;
  if (userName) userName = userName.trim().toLowerCase();
  if (name) name = name.trim();
  if (userName.trim().length < 5) {
    return next(
      new ErrorHandler("Username should have atleast 5 characters", 400)
    );
  }
  let user = await UserModel.findOne({ userName });
  if (user) {
    return next(new ErrorHandler("Username is already taken", 400));
  }
  // console.log(req.userId, "HERE");
  const userInfo = await UserModel.findById(req.userId);
  if (!userInfo) {
    return next(new ErrorHandler("User not available", 400));
  }

  if (req.file) {
    userInfo.avatar = req.file.path;
  }
  const updatedUser = {
    userName,
    name,
    avatar: userInfo.avatar,
  };

  user = await UserModel.findByIdAndUpdate(req.userId, updatedUser, {
    new: true,
  });

  return res.status(201).json({
    success: true,
    message: "Updated",
    user,
  });
});

module.exports = {
  registerUser,
  updatePassword,
  resetPassword,
  getUserInfo,
  forgotPassword,
  updateProfile,
};
