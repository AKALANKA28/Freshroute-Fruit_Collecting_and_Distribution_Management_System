const moment = require('moment')
const OrderDetail = require("../../models/q_and_o/MockOrderDetail");
const OrderExecutionDetail = require("../../models/q_and_o/OrderExecutionDetail");  
const Employee = require("../../models/StaffManager/Employee")

exports.getPendingOrderList = async (req, res) => {
    const filter = { orderStatus: "PENDING" };
    await getOrderListByFilter(res, filter);
};
exports.getAllOrderList = async (req, res) => {
    try {
        const orderList = await OrderDetail.find();
        res.json(orderList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};

exports.getOngoingOrderList = async (req, res) => {
    const filter = { $or: [{ orderStatus: "ASSIGNED" }, { orderStatus: "IN_PROGRESS" }] }
    await getOrderListByFilter(res, filter);
};

exports.getCompletedOrderList = async (req, res) => {
    const filter = { orderStatus: "COMPLETED" };
    await getOrderListByFilter(res, filter);
};
exports.getPendingOrderListByFilter = async (req, res) => {
    const filter = createFilterFromRequest(req);
    if (filter && filter.date) {
        getOrderListByDateFilter(res,filter, {orderStatus:"PENDING"})
    }else if (filter) {
        filter.orderStatus = "PENDING";
        await getOrderListByFilter(res, filter);
    } else {
        res.status(400).json({ message: 'Invalid filter type' });
    }
};

exports.getOngoingOrderListByFilter = async (req, res) => {
    const filter = createFilterFromRequest(req);
    if (filter && filter.date) {
        getOrderListByDateFilter(res,filter, {$or: [{ orderStatus: "ASSIGNED" }, { orderStatus: "IN_PROGRESS" }]})
    }else if (filter) {
        filter.$or = [{ orderStatus: "ASSIGNED" }, { orderStatus: "IN_PROGRESS" }];
        await getOrderListByFilter(res, filter);
    } else {
        res.status(400).json({ message: 'Invalid filter type' });
    }
};

exports.getCompletedOrderListByFilter = async (req, res) => {
    const filter = createFilterFromRequest(req);
    if (filter && filter.date) {
        getOrderListByDateFilter(res,filter, {orderStatus:"COMPLETED"})
    }else if (filter) {
        filter.orderStatus = "COMPLETED";
        await getOrderListByFilter(res, filter);
    } else {
        res.status(400).json({ message: 'Invalid filter type' });
    }
};

const createFilterFromRequest = (req) => {
    const filterType = req.body.filterType;
    const filterValue = req.body.filterValue;
    let filter;
    switch (filterType) {
        case 'fruit':
            filter = { fruit: new RegExp(filterValue, 'i') };
            break;
        case 'category':
            filter = { category: new RegExp(filterValue, 'i') };
            break;
        case 'quality':
            filter = { quality: new RegExp(filterValue, 'i') };
            break;
        case 'customer':
            filter = { customer: new RegExp(filterValue, 'i') };
            break;
        case 'quantity':
            filter = { quantity: parseFloat(filterValue) };
            break;
        case 'placedDate':
            filter = {
                date: filterValue,
                field: 'placedDate'
            };
            break;
        case 'dueDate':
            filter = {
                date: filterValue,
                field: 'dueDate'
            };
            break;
        default:
            return null;
    }
    return filter;
}

const getOrderListByFilter = async (res, filter) => {
    try {
        const pendingOrderList = await OrderDetail.find(filter);
        res.json(pendingOrderList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
}
const getOrderListByDateFilter = async (res, dateFilter, filter) => {
    try {
        const orderList = await OrderDetail.find(filter);
        const dateField = dateFilter.field;
        const dateValue = dateFilter.date;
        const newList = orderList.filter((item) => {
            const dateString = item[dateField];
            const formattedDate = moment(dateString).format("YYYY-MM-DD")
            return formattedDate=== dateValue
        })
        res.json(newList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
}


exports.getOrderProcessorList = async (req, res) => {
    try {
        const filter = { jobrole:"Order Processor"};
        const opList = await Employee.find(filter);
        res.json(opList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving order processor list", error: err.message });
    }
};

exports.assignOrder = async (req, res) => {
    const {orderId, opName, opId } = req.body;
    try {
        const order = await OrderDetail.findByIdAndUpdate(orderId, {
            $set: {
                orderStatus: "ASSIGNED",
                opId : opId,
                opName : opName,
            },
        }, { new: true });

        if (!order) {
            return res.status(404).json({ status: "Order not found" });
        }
        const orderExecutionRecord = new OrderExecutionDetail({
            orderId: orderId,
            opName : opName,
            opId : opId,
            fruit: order.fruit,
            customer : order.customerName,
            category: order.category,
            quality: order.quality,
            quantity: order.quantity,
            placedDate: order.placedDate,
            dueDate: order.dueDate,
            orderStatus: "ASSIGNED",
            lastUpdatedTime: new Date()
        });
        await orderExecutionRecord.save();

        res.status(200).json({ status: "Order assigned successfully", orderExecutionRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error occurred while assigning the order", error: err.message });
    }
};

exports.editAssignOrder = async (req, res) => {
    const {orderId, opName, opId } = req.body;
    try {
        const originalOrder = await OrderDetail.findById(orderId);
        if (!originalOrder) {
            res.status(200).json({ status: "Order Not Found"});
            return;
        }
        if (originalOrder.orderStatus === "IN_PROGRESS") {
            res.status(200).json({ status: "Order process has already started. Edit Failed."});
            return;
        }
        const order = await OrderDetail.findByIdAndUpdate(orderId, {
            $set: {
                orderStatus: "ASSIGNED",
                opId : opId,
                opName : opName,
            },
        }, { new: true });


        const orderExecutionRecord = await OrderExecutionDetail.find({orderId: orderId});
        await OrderExecutionDetail.findByIdAndUpdate(orderExecutionRecord[0]._id, {
            $set: {
                opName: opName,
                opId: opId,
                lastUpdatedTime: new Date()
            }
        })

        res.status(200).json({ status: "Order assigned successfully", orderExecutionRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error occurred while assigning the order", error: err.message });
    }
};

exports.unAssignOrder = async (req, res) => {
    const orderId = req.params.orderId;


    try {
        const originalOrder = await OrderDetail.findById(orderId);
        if (!originalOrder) {
            res.status(200).json({ status: "Order Not Found"});
            return;
        }
        if (originalOrder.orderStatus === "IN_PROGRESS") {
            res.status(200).json({ status: "Order process has already started. Un Assign Failed."});
            return;
        }
        const order = await OrderDetail.findByIdAndUpdate(orderId, {
            $set: {
                orderStatus: "PENDING",
                lastUpdatedTime: new Date(),
            },
            $unset: {
                opId: "",
                opName: "",
            },
        }, { new: true });

        if (!order) {
            return res.status(404).json({ status: "Order not found" });
        }
        const orderExecutionRecord = await OrderExecutionDetail.find({orderId: orderId});
        await OrderExecutionDetail.findByIdAndDelete(orderExecutionRecord[0]._id)
        res.status(200).json({ status: "Successfully Un Assigned"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error occurred while assigning the order", error: err.message });
    }
};
