const express = require("express");
const {
  getPosts,
  getParticularPost,
  createPost,
  getSearchPosts,
  updatePost,
  deletePost,
} = require("../Controller/Post/post.controller");
const { auth } = require("../Middleware/auth");
const upload = require("../Middleware/imageUpload");
const postRoute = express();
postRoute.route("/").get(getPosts);
postRoute
  .route("/:id")
  .get(getParticularPost)
  .put(auth, upload.single("postImage"), updatePost)
  .delete(auth, deletePost);
postRoute.route("/search/text").get(getSearchPosts);
postRoute.route("/create").post(auth, upload.single("postImage"), createPost);

module.exports = postRoute;
