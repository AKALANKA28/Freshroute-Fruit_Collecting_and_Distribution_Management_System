const Notice = require("../../models/StaffManager/Notice");

const addNotice = async (req, res) => {
  const { date, title, description } = req.body;

  try {
    const newNotice = await Notice.create({
      date,
      title,
      description,
    });
    res.json("Notice is created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNoticesCount = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json({ count: notices.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneNotice = async (req, res) => {
  const id = req.params.id;
  try {
    const notice = await Notice.findById(id);
    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNotice = async (req, res) => {
  const id = req.params.id;
  try {
    await Notice.findByIdAndDelete(id);
    res.status(200).json({ message: "Notice is Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNotice = async (req, res) => {
  const id = req.params.id;
  const { date, title, description } = req.body;
  try {
    await Notice.findByIdAndUpdate(id, {
      date,
      title,
      description,
    });
    res.status(200).json({ message: "Notice updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addNotice,
  getAllNotices,
  getOneNotice,
  deleteNotice,
  updateNotice,
  getNoticesCount,
};
