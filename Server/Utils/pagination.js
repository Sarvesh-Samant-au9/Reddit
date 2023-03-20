const paginate = (page, limit, count) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results = {};
  if (endIndex < count) {
    results.next = {
      page: page + 1,
      limit,
    };
  } else {
    results.previous = {
      page: page - 1,
      limit,
    };
  }
  return {
    startIndex,
    endIndex,
    results,
  };
};

module.exports = paginate;
