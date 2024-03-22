const express = require("express");
const router = express.Router();
const categoryInfoController = require("../Controller/categoryController");

router.post("/addcategory", categoryInfoController.saveCategoryInfo);
router.get("/categories", categoryInfoController.getCategoryInfo);
router.put("/categories/:id", categoryInfoController.updateCategoryInfo);
module.exports = router;