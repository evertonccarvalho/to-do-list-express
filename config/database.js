const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Connection to MongoDB failed: " + error.message);
  }
};

module.exports = connectDB;
