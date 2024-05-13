const Message = require("../../models/StaffManager/Message");

const addMessage = async (req, res) => {
  const { date, title, message } = req.body;

  try {
    const newMessage = await Message.create({
      date,
      title,
      message,
    });
    res.json("Message is created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const message = await Message.find();
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMessagesCount = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({ count: messages.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const message = await Message.findById(id);
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMessage = async (req, res) => {
  const id = req.params.id;
  try {
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Message is Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMessage = async (req, res) => {
  const id = req.params.id;
  const { date, title, message } = req.body;
  try {
    await Message.findByIdAndUpdate(id, {
      date,
      title,
      message,
    });
    res.status(200).json({ message: "Message updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addMessage,
  getAllMessages,
  getOneMessage,
  deleteMessage,
  updateMessage,
  getMessagesCount,
};
