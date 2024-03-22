const express = require("express");
const router = express.Router();
const productInfoController = require("../Controller/productController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");




// router.post("/upload", upload.array("image", 5), imageController.uploadImages);
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

  const imagesDirectory = "public/images";
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory, { recursive: true });
  }

  router.post("/products", upload.single("image"), productInfoController.saveProductInfo);
  router.get("/products", productInfoController.getProductInfo);
router.delete("/products/:id", productInfoController.deletedProductInfo);
  module.exports = router;