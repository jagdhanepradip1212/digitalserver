const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryInfoRoutes = require("./Routes/categoryIngoRoutes");
const userRoutes = require("./Routes/authRoute");
const productInfoRoutes = require("./Routes/ProductRoute");
const bodyParser = require("body-parser");
const path = require("path"); 


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/categoriesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes

app.use("/", categoryInfoRoutes);
app.use("/", userRoutes);
app.use("/", productInfoRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});