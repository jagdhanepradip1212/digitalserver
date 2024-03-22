const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    packSize: String,
    category: String,
    mrp: String,
    image: String,
    status: String,
  });
  
  module.exports = mongoose.model("ProductInfo", productSchema);