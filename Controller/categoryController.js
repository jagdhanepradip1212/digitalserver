const CategoryInfo = require("../Model/categoryModel");

exports.getCategoryInfo = async (req, res) => {
    try {
      const categoryInfo = await CategoryInfo.find();
      res.json(categoryInfo);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


exports.saveCategoryInfo = async (req, res) => {
    const { categoryName, description, status } = req.body;

    try {
      const newCategory = new CategoryInfo({
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
};

exports.updateCategoryInfo = async(req, res) => {
  const categoryId = req.params.id;
  const { status } = req.body;

  try {
    // Find the category by ID and update its status
    const updatedCategory = await CategoryInfo.findByIdAndUpdate(
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
}