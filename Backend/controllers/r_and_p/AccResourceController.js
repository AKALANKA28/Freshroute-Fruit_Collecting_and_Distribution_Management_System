// AccResController.js
const AccResource = require('../../models/r_and_p/AccResource');

const addAccResource = async (req, res) => {
    const { name, email, contactNumber, location, farmSize, fruitType, productionCapacity, resourceType, otherResource, detailReq } = req.body;
    try {
        const newAccResource = await AccResource.create({ name, email, contactNumber, location, farmSize, fruitType, productionCapacity, resourceType, otherResource, detailReq });
        res.json("New Details Added");
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    const getAllAccResources = async (req, res) => {
      try {
        const accResources = await AccResource.find();
        res.json(accResources);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    const getOneAccResource = async (req, res) => {
      const id = req.params.id;
      try {
        const accResource = await AccResource.findById(id);
        res.status(200).json(accResource);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    const deleteAccResource = async (req, res) => {
      const id = req.params.id;
      try {
        await AccResource.findByIdAndDelete(id);
        res.status(200).json({ message: "Details Deleted" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    const updateAccResource = async (req, res) => {
      const id = req.params.id;
      const { name, email, contactNumber, location, farmSize, fruitType, productionCapacity, resourceType, otherResource, detailReq } = req.body;
      try {
        await AccResource.findByIdAndUpdate(id, { name, email, contactNumber, location, farmSize, fruitType, productionCapacity, resourceType, otherResource, detailReq });
        res.status(200).json({ message: "Details updated" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    
    module.exports = {
      addAccResource,
      getAllAccResources,
      getOneAccResource,
      deleteAccResource,
      updateAccResource,
    };
    