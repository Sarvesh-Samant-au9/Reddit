const tryCatch = require("../../Middleware/tryCatch");
const PostModel = require("../../Model/Post.Model");
const UserModel = require("../../Model/User.Model");
const ErrorHandler = require("../../Utils/ErrorHandler");
const paginate = require("../../Utils/pagination");
const sorting = require("../../Utils/sortQuery");

const getPosts = tryCatch(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sortBy = req.query.sortby;

  const allPosts = await PostModel.countDocuments();
  const paginated = paginate(page, limit, allPosts);
  let sortQuery = sorting(sortBy);
  const posts = await PostModel.find({})
    .sort(sortQuery)
    .limit(limit)
    .skip(paginated.startIndex);
  return res.status(200).json({
    success: true,
    posts,
    message: "Data Fetched",
  });
});

const getSearchPosts = tryCatch(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search;
  let searchQuery = {
    $or: [
      {
        postTitle: {
          $regex: search,
          $options: "i",
        },
      },
      {
        postText: {
          $regex: search,
          $options: "i",
        },
      },
    ],
  };
  const allPosts = await PostModel.find(searchQuery).countDocuments();
  const paginated = paginate(page, limit, allPosts);
  const searchedPosts = await PostModel.find(searchQuery)
    .limit(limit)
    .skip(paginated.startIndex);
  return res.status(200).json({
    success: true,
    searchedPosts,
    message: "Data Fetched",
  });
});

const getParticularPost = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }
  const data = await post.populate("author", ["userName", "avatar"]);
  return res.status(200).json({
    success: true,
    message: "Post fetched",
    data,
  });
});

const createPost = tryCatch(async (req, res, next) => {
  const { postTitle, postText, postLink, postType } = req.body;
  let post = {};
  if (req.file && req.file.path) {
    post.postImage = req.file.path;
  }
  post = {
    ...post,
    postTitle,
    postLink,
    postText,
    postType,
  };
  const user = await UserModel.findById(req.user);
  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }
  const postData = new PostModel(post);
  return res.status(201).json({
    success: true,
    message: "New Post created",
    post: postData,
  });
});

module.exports = { getPosts, getSearchPosts, getParticularPost, createPost };
