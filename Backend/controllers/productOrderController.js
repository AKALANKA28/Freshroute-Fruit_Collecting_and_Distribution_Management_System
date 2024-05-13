
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbId');
const Order = require("../models/orderModel");




exports.getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const userorders = await Order.findOne({ orderby: _id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
  
  exports.getAllOrders = asyncHandler(async (req, res) => {
    try {
      const alluserorders = await Order.find()
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(alluserorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
  exports.getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const userorders = await Order.findOne({ orderby: id })
        .populate("products.product")
        .populate("orderby")
        .exec();
      res.json(userorders);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
  exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          },
        },
        { new: true }
      );
      res.json(updateOrderStatus);
    } catch (error) {
      throw new Error(error);
    }
  });
  