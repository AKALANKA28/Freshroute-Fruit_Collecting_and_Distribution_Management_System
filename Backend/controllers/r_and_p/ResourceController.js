// ./Backend\controllers\r_and_p\ResourceController.js
const Resource = require("../../models/r_and_p/Resource");

const addResource = async (req, res) => {
  const { resource_type, description, qty } = req.body;
  try {
    const newResource = await Resource.create({ resource_type, description, qty });
    res.json("New Resource Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneResource = async (req, res) => {
  const id = req.params.id;
  try {
    const oneResource = await Resource.findById(id);
    res.status(200).json(oneResource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteResource = async (req, res) => {
  const id = req.params.id;
  try {
    await Resource.findByIdAndDelete(id);
    res.status(200).json({ message: "Resource Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateResource = async (req, res) => {
  const id = req.params.id;
  const { resource_type, description, qty } = req.body;
  try {
    await Resource.findByIdAndUpdate(id, { resource_type, description, qty });
    res.status(200).json({ message: "Resource Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addResource,
  getAllResources,
  getOneResource,
  deleteResource,
  updateResource,
};
