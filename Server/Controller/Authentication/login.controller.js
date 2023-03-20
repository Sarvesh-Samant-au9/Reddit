const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tryCatch = require("../../Middleware/tryCatch");
const UserModel = require("../../Model/User.Model");
const ErrorHandler = require("../../Utils/ErrorHandler");

const loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const findByEmail = await UserModel.findOne({ email }).select("+isVerified");
  if (!findByEmail) {
    return next(new ErrorHandler("User is already registered", 400));
  }
  // console.log(findByEmail);
  if (!findByEmail.isVerified) {
    return next(new ErrorHandler("Please verify your mail", 400));
  }
  const user = await UserModel.findOne({ email }).select("+password");
  console.log(user);
  // const credentialsValid = await bcrypt.compare(password, user.password);
  // if (!credentialsValid) {
  //   return next(new ErrorHandler("Invalid Credentials", 400));
  // }
  const payloadToken = {
    userId: user._id,
  };
  const token = jwt.sign(payloadToken, process.env.JWT_SECRET);
  return res.status(200).json({
    success: true,
    user,
    token,
  });
});
module.exports = { loginUser };
