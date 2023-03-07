const tryCatch = require("../Middleware/tryCatch.js");
const fs = require("fs/promises");
const htmlReader = tryCatch(async (path) => {
  const html = await fs.readFile(path, { encoding: "utf-8" });
  return html;
});

module.exports = htmlReader;
