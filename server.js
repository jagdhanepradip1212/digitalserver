const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const multer = require("multer");
const path = require("path"); 
const app = express();
const fs = require("fs");

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/categoriesDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const imagesDirectory = "public/images";
if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true });
}

// Define Category schema
const categorySchema = new mongoose.Schema({
  categoryName: String,
  description: String,
  status: String
});

const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
    productName: String,
    packSize: String,
    category: String,
    mrp: String,
    image: String,
    status: String,
  });
  
  const Product = mongoose.model('Product', productSchema);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images"); // Save images to public/images folder
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      ); // Generate unique filename
    },
  });

  const upload = multer({ storage: storage });


// Route to handle adding a new category
app.post('/addcategory', async (req, res) => {
  const { categoryName, description, status } = req.body;

  try {
    const newCategory = new Category({
      categoryName,
      description,
      status
    });

    await newCategory.save();
    console.log('Category saved successfully:', newCategory);
    res.status(200).json({ message: 'Category saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving category' });
  }
});

// Route to handle fetching all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    console.log('Categories fetched successfully');
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
});




  app.put('/categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { status } = req.body;
  
    try {
      // Find the category by ID and update its status
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { status },
        { new: true }
      );
  
      // Check if the category exists
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      console.log('Category updated successfully:', updatedCategory);
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Error updating category' });
    }
  });
  
  

app.post("/products", upload.single("image"), async (req, res) => {
    try {
      const {
        productName,
        packSize,
        category,
        mrp,
        image,
        status
      } = req.body;

      const imagePath = req.file ? req.file.path.replace("public\\", "") : "";

  
      // Create a new product instance
      const newProduct = new Product({
        productName,
        packSize,
        category,
        mrp,
        image: imagePath,
        status
      });
  
      // Save the product to the database
      await newProduct.save();
  
      res.status(201).json({ message: 'Product saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // API endpoint to get all products
app.get('/products', async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
  
    try {
      // Find the product by ID and delete it
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error('Product not found');
      }
      console.log('Product deleted successfully:', deletedProduct);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    }
  });

  
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
