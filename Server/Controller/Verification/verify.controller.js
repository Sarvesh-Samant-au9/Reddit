const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const tryCatch = require("../../Middleware/tryCatch");
const UserModel = require("../../Model/User.Model");
const ErrorHandler = require("../../Utils/ErrorHandler");

// /api/v1/onboarding/:token
// Verify User

const verifyAndOnboarding = tryCatch(async (req, res, next) => {
  const token = req.params.token;
  const verify = crypto.createHash("sha256").update(token).digest("hex");
  const user = await UserModel.findOne({ verificationToken: verify });
  if (!user) {
    return next(new ErrorHandler("Invalid or Expired Token", 400));
    // return res.status(400).json({
    //   success: false,
    //   message: "Invalid or Expired Token",
    // });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  if (req.file) user.avatar = req.file.path;
  await user.save();
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, (err, token) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      message: "User Verified",
      token,
    });
  });
});

module.exports = verifyAndOnboarding;
