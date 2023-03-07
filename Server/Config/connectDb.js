const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(db.version, "Connected ");
  } catch (error) {
    console.log(error, "Something Went Wrong");
    process.exit(1);
  }
};
module.exports = connectDB;
