const Unregistered = require("../../models/StaffManager/Unregistered");

const addUnregistered = async (req, res) => {
  const {
    imageUrl,
    name,
    jobrole,
    nic,
    address,
    email,
    password,
    accno,
    bankname,
    fileUrl,
    joineddate,
  } = req.body;

  try {
    const newUnregistered = await Unregistered.create({
      imageUrl,
      name,
      jobrole,
      nic,
      address,
      email,
      password,
      accno,
      bankname,
      fileUrl,
      joineddate,
    });
    res.json("New Unregistered User Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUnregistereds = async (req, res) => {
  try {
    const unregistered = await Unregistered.find();
    res.json(unregistered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneUnregistered = async (req, res) => {
  const id = req.params.id;
  try {
    const unregistered = await Unregistered.findById(id);
    res.status(200).json(unregistered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUnregistered = async (req, res) => {
  const id = req.params.id;
  try {
    await Unregistered.findByIdAndDelete(id);
    res.status(200).json({ message: "Unregistered User Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUnregistered = async (req, res) => {
  const id = req.params.id;
  const {
    imageUrl,
    name,
    jobrole,
    nic,
    address,
    email,
    password,
    accno,
    bankname,
    fileUrl,
    joineddate,
  } = req.body;
  try {
    await Unregistered.findByIdAndUpdate(id, {
      imageUrl,
      name,
      jobrole,
      nic,
      address,
      email,
      password,
      accno,
      bankname,
      fileUrl,
      joineddate,
    });
    res.status(200).json({ message: "Unregistered User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUnregisteredCount = async (req, res) => {
  try {
    const unregistereds = await Unregistered.find();
    res.json({ count: unregistereds.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addUnregistered,
  getAllUnregistereds,
  getOneUnregistered,
  deleteUnregistered,
  updateUnregistered,
  getUnregisteredCount,
};
