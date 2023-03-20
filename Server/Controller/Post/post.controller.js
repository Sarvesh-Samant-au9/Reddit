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
  });
});

const createPost = tryCatch(async (req, res, next) => {
  const { postTitle, postText, postLink, postType } = req.body;
});

module.exports = { getPosts, getSearchPosts };
