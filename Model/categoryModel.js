const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: String,
  description: String,
  status: String
});

module.exports = mongoose.model("CategoryInfo", categorySchema);