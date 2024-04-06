const mockController = require("./mockController")
const Order = require('../../models/q_and_o/OrderExecutionDetail');

//temp
exports.addToMock = async (req, res) => {
    await mockController.addMockOrder(req, res);
};


// Controller for adding a new order
exports.addOrder = async (req, res) => {
    try {
        const {
            opName,
            customer,
            fruitCategory,
            grade,
            quantity,
            placedDate,
            dueDate,
            executionHistory
        } = req.body;

        const newOrder = new Order({
            opName,
            customer,
            fruitCategory,
            grade,
            quantity,
            placedDate,
            dueDate,
            executionHistory
        });

        await newOrder.save();
        res.json("Order Added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error adding order", error: err.message });
    }
};

// Controller for retrieving all orders
exports.getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.json(allOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving orders", error: err.message });
    }
};

// Controller for retrieving a specific order by ID
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const foundOrder = await Order.findById(orderId);
        
        if (!foundOrder) {
            return res.status(404).json({ status: "Order not found" });
        }
        
        res.status(200).json({ status: "Order fetched", order: foundOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving order", error: err.message });
    }
};

// Controller for updating an order
exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const {
            opName,
            customer,
            fruitCategory,
            grade,
            quantity,
            placedDate,
            dueDate,
            executionHistory
        } = req.body;

        const updateOrder = {
            opName,
            customer,
            fruitCategory,
            grade,
            quantity,
            placedDate,
            dueDate,
            executionHistory
        };

        const updatedOrder = await Order.findByIdAndUpdate(orderId, updateOrder, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ status: "Order not found" });
        }

        res.status(200).json({ status: "Order updated", updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating order", error: err.message });
    }
};

// Controller for deleting an order
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ status: "Order deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting order", error: err.message });
    }
};
