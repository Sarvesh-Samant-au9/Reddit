const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler");
const tryCatch = require("./tryCatch");
const auth = tryCatch(async (req, res, next) => {
  const token = req.header("x-auth-token");
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Authorization Denied 1", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.userId) {
    return next(new ErrorHandler("Authorization Denied 2", 401));
  }
  req.userId = decoded.userId;
  // console.log(req.userId);
  next();
});

const unknownEndPoint = (_req, res) => {
  res.status(404).send({
    message: "Unknown endpoint",
  });
};

module.exports = {
  auth,
  unknownEndPoint,
};
