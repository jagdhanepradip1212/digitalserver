const ProductInfo = require("../Model/productModel");

exports.getProductInfo = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await ProductInfo.find();
    
        res.status(200).json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
  };


exports.saveProductInfo = async (req, res) => {
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
        const newProduct = new ProductInfo({
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
};


exports.deletedProductInfo = async (req, res) => {
  const productId = req.params.id;
  
    try {
      // Find the product by ID and delete it
      const deletedProduct = await ProductInfo.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error('Product not found');
      }
      console.log('Product deleted successfully:', deletedProduct);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    }
}
