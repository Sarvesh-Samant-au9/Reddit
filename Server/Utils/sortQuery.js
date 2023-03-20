const sorting = (sort) => {
  let sortQuery;
  switch (sort) {
    case "new":
      sortQuery = { createdAt: -1 };
      break;
    case "old":
      sortQuery = { createdAt: 1 };
      break;
    case "top":
      sortQuery = { pointsCount: -1 };
      break;
    case "best":
      sortQuery = { voteRatio: -1 };
      break;
    case "hot":
      sortQuery = { hotAlgo: -1 };
      break;
    default:
      sortQuery = {};
  }
  return sortQuery;
};
module.exports = sorting;
