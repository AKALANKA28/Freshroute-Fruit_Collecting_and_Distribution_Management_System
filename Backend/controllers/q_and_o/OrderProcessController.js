const OrderDetail = require("../../models/q_and_o/MockOrderDetail");
const OrderExecutionDetail = require("../../models/q_and_o/OrderExecutionDetail");
const AcceptedSupply = require("../../models/farmers/acceptedSupplies")


exports.getSupplierList = async (req, res) => {
    try {
        const { fruit, category, quality } = req.body;
        const filter = { fruit:fruit, subCategory:category, quality:quality};
        const supplierList = await AcceptedSupply.find(filter);
        res.json(supplierList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving orders", error: err.message });
    }
};
exports.getAllSuppliers = async (req, res) => {
    try {
        const supplierList = await AcceptedSupply.find();
        res.json(supplierList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving orders", error: err.message });
    }
};
exports.updateSuppliers = async (req, res) => {
    try {
        const { supplierList } = req.body;
        if (supplierList) {
            for( const supplier of supplierList){
                await AcceptedSupply.findByIdAndUpdate(supplier._id,{
                    $set:{
                        quantity: supplier.quantity
                    }
                })
            }
            res.status(200).json({status: "Quantity successfully updated"})
        } else {
            res.status(200).json({status: "There are no records to update"})
        }
    } catch (err) {
        res.status(500).json({ status: "Error occurred while updating supplier quantity", error: err.message });
    }
};

exports.getAssignedOrderList = async (req, res) => {
    const filter = { orderStatus: "ASSIGNED" };
    await getOrderListByFilter(res, filter);
};

exports.getOngoingOrderList = async (req, res) => {
    const filter = { orderStatus: "IN_PROGRESS" };
    await getOrderListByFilter(res, filter);
};

exports.getCompletedOrderList = async (req, res) => {
    const filter = { orderStatus: "COMPLETED" };
    await getOrderListByFilter(res, filter);
};
exports.getAssignedOrderListByFilter = async (req, res) => {
    const filter = createFilterFromRequest(req);
    if (filter) {
        filter.orderStatus = "ASSIGNED";
        await getOrderListByFilter(res, filter);
    } else {
        res.status(400).json({ message: 'Invalid filter type' });
    }
};

exports.getOngoingOrderListByFilter = async (req, res) => {
    const filter = createFilterFromRequest(req);
    if (filter) {
        filter.$or = [ { orderStatus: "IN_PROGRESS" }];
        await getOrderListByFilter(res, filter);
    } else {
        res.status(400).json({ message: 'Invalid filter type' });
    }
};

exports.getCompletedOrderListByFilter = async (req, res) => {
    const filter = createFilterFromRequest(req);
    if (filter) {
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
        case 'placedDate':
            filter = { placedDate: new Date(filterValue) };
            break;
        case 'dueDate':
            filter = { dueDate: new Date(filterValue) };
            break;
        default:
            return null;
    }
    return filter;
}

const getOrderListByFilter = async (res, filter) => {
    try {
        const pendingOrderList = await OrderExecutionDetail.find(filter);
        res.json(pendingOrderList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
}

exports.executeOrder = async (req, res) => {
    const { orderId, executionDetails, status, id, filledQuantity } = req.body;
    await OrderDetail.findByIdAndUpdate(orderId, {
        $set: {
            orderStatus:status
        }
    });

    const updatedOrder = await OrderExecutionDetail.findByIdAndUpdate(id, {
        $set: {
            executionHistory: executionDetails,
            orderStatus: status,
            filledQuantity: filledQuantity
        }
    })

    if (updatedOrder) {
        res.json(updatedOrder)
    } else {
        res.status(400).json({ message: 'Invalid execution' });
    }
};
