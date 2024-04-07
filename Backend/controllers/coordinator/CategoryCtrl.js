const Category = require("../../models/coordinator/FruitDetail");

const addCategory = async (req, res) => {
  const { fruit, category, date, weight, quality, price } = req.body;
  try {
    const newCategory = await Category.create({
      fruit,
      category,
      date,
      weight,
      quality,
      price,
    });
    res.json("New Category Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.json(Categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const { fruit, category, date, weight, quality, price } = req.body;
  try {
    await Category.findByIdAndUpdate(id, {
      fruit,
      category,
      date,
      weight,
      quality,
      price,
    });
    res.status(200).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getOneCategory,
  deleteCategory,
  updateCategory,
};
