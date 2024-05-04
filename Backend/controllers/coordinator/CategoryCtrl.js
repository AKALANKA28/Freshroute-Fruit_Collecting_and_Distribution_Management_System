const Category = require("../../models/coordinator/FruitDetail");

const addCategory = async (req, res) => {
  const { imageUrl, fruit, category, date, weight, quality, price } = req.body;
  try {
    const newCategory = await Category.create({
      imageUrl,
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
  const { imageUrl, fruit, category, date, weight, quality, price } = req.body;
  try {
    await Category.findByIdAndUpdate(id, {
      imageUrl,
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

const getFruitNames = async (req, res) => {
  try {
    const fruitNames = await Category.distinct("fruit");
    res.json(fruitNames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubCategoriesByFruit = async (req, res) => {
  const fruit = req.params.fruit;
  try {
    const subCategories = await Category.distinct("category", { fruit: fruit });
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getQualityFruit = async (req, res) => {
  const fruit = req.params.fruit;
  try {
    const qualities = await FruitDetail.distinct("quality", { fruit });
    res.json(qualities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getOneCategory,
  deleteCategory,
  updateCategory,
  getFruitNames,
  getSubCategoriesByFruit,
  getQualityFruit,
};
