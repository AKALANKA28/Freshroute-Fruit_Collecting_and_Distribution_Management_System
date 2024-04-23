// AccResController.js
const AccRes = require('../../models/r_and_p/AccRes');

const createAccRes = async (req, res) => {
    try {
        const newAccRes = new AccRes(req.body);
        await newAccRes.save();
        res.status(201).json(newAccRes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllAccRess = async (req, res) => {
    try {
        const accRess = await AccRes.find();
        res.status(200).json(accRess);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAccRes,
    getAllAccRess,
};
