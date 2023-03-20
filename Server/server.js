const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./Config/connectDb.js");
const error = require("./Middleware/error.js");
const cors = require("cors");
const authRouter = require("./Routes/auth.routes.js");
const postRoute = require("./Routes/post.routes.js");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
// app.use();
// app.get("/hello", function (req, res) {
//   console.log(req);
//   return res.json({
//     success: true,
//     message: "First Route",
//     data: req,
//   });
// });
// app.use(cors());
// app.use(express.bodyParser());
// app.use(router);
// app.use(error);
// app.listen(4000, () => {
//   connectDB();
//   console.log(`Server Started at 4000`);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
console.log(__dirname);
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/url", urlRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRoute);
connectDB();
app.use(error);

app.listen(PORT, () => {
  console.log(`${PORT} started`);
});
