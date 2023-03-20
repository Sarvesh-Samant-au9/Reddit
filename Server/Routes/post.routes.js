const express = require("express");
const {
  getPosts,
  getParticularPost,
  createPost,
  getSearchPosts,
} = require("../Controller/Post/post.controller");
const { auth } = require("../Middleware/auth");
const upload = require("../Middleware/imageUpload");
const postRoute = express();
postRoute.route("/post").get(getPosts);
postRoute.route("/post/:id").get(getParticularPost);
postRoute
  .route("/post/create")
  .post(auth, upload.single("postImage"), createPost);
postRoute.route("/search").get(getSearchPosts);

module.exports = postRoute;
