const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

// const Coupen = require('../models/coupenModel');

const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwtToken");
const crypto = require("crypto");
const sendEmail = require("./emailController");
const { updateRevenueOnSalesAdd } = require("../middlewares/revenueUpdate");

// Register a User
exports.registerUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a User------------------------------------------------------------------------------------------
exports.loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateduser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      // mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login------------------------------------------------------------------------------------------
exports.loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      name: findAdmin?.firstname,
      email: findAdmin?.email,
      // mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//Logout------------------------------------------------------------------------------------------
exports.logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

//Get All Users------------------------------------------------------------------------------------------
exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.json(getAllUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get user by id------------------------------------------------------------------------------------------
exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUserById = await User.findById(id);
    res.json({
      getUserById,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update a User------------------------------------------------------------------------------------------
exports.updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a User------------------------------------------------------------------------------------------
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// handle refresh token------------------------------------------------------------------------------------------
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//Block User------------------------------------------------------------------------------------------
exports.blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unblock User------------------------------------------------------------------------------------------
exports.unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user Unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update password------------------------------------------------------------------------------------------
exports.updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//forgot password------------------------------------------------------------------------------------------
exports.forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8070/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//reset password------------------------------------------------------------------------------------------
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

// save user Address------------------------------------------------------------------------------------------
exports.saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});


// exports.userCart = asyncHandler(async (req, res) => {
//   const { cart } = req.body;
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     let products = [];
//     const user = await User.findById(_id);
//     // check if user already have product in cart
//     const alreadyExistCart = await Cart.findOne({ orderby: user._id });
//     if (alreadyExistCart) {
//       alreadyExistCart.remove();
//     }
//     for (let i = 0; i < cart.length; i++) {
//       let object = {};
//       object.product = cart[i]._id;
//       object.quantity = cart[i].quantity;
//       object.grade = cart[i].color;
//       let getPrice = await Product.findById(cart[i]._id).select("price").exec();
//       object.price = getPrice.price;
//       products.push(object);
//     }
//     let cartTotal = 0;
//     for (let i = 0; i < products.length; i++) {
//       cartTotal = cartTotal + products[i].price * products[i].quantity;
//     }
//     let newCart = await new Cart({
//       products,
//       cartTotal,
//       orderby: user?._id,
//     }).save();
//     res.json(newCart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// user cart
exports.userCart = asyncHandler(async (req, res) => {
  const { productId, grade, quantity, price } = req.body;
  const { _id } = req.user;
  // console.log(req.user);
  validateMongoDbId(_id);
  try {

    let newCart = await new Cart({
      userId:_id,
      productId,
      grade,
      quantity,
      price,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get cart details
exports.getUserCart = asyncHandler(async (req, res) => { 
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
    .populate( "productId")
    .populate( "grade");

    // const cart = await Cart.findOne().populate("productId");

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//remove product from  user cart

exports.removeProductFromCart = asyncHandler(async (req, res) => { 
  const { _id } = req.user;
  const {cartItemId} = req.params;
  validateMongoDbId(_id);
  try {
    const deleteProductFromCart = await Cart.deleteOne({userId:_id, _id:cartItemId })

    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
})


//empty user cart
exports.emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const deletedcart = await Cart.deleteMany({ userId: _id });
    res.json(deletedcart);
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateProductQuantityFromCart = asyncHandler(async (req, res) => { 
  const { _id } = req.user;
  const {cartItemId, quantity} = req.params;
  // console.log(cartItemId);
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({userId:_id, _id: cartItemId })
    cartItemId.quantity = quantity
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
})



exports.createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    // paymentInfo,
    orderItems,
    totalPrice,
    // totalPriceAfterDiscount,
  } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      // paymentInfo,
      orderItems,
      totalPrice,
      // totalPriceAfterDiscount,
      user: _id,
    });
    res.json(order);
    await updateRevenueOnSalesAdd(req, res, next);

  } catch (error) {
    throw new Error(error);
  }
});


//Get Orders
exports.getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.grade");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});



//Get All Orders
exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.grade");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

//Get Single Order
exports.getSingleOrder = asyncHandler(async (req, res) => {
      const { id } = req.params;
      validateMongoDbId(id)
      try {
          const userOrders = await Order.findOne({_id: id}).populate('orderItems.product').populate('orderItems.grade').populate('user').exec()
          res.json(userOrders)
      } catch (error) {
          throw new Error(error)
      }
  })

  //Update Order Status
  exports.updateOrderStatus = asyncHandler(async (req, res) => {
        const { status } = req.body
        const { id } = req.params
        try {
            const updateStatus = await Order.findByIdAndUpdate(id,
                {
                  orderStatus: status,
                }, { new: true })
                res.json(updateStatus)
        } catch (error) {
            throw new Error(error)
        }
    })


// Delete a Order record

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Correct variable name to orderId
    await Order.findByIdAndDelete(orderId); // Use orderId to find and delete the order
    res.status(200).json({ status: "Order deleted successfully" }); // Send success response
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: "Error deleting order", error: err.message }); // Send error response
  }
};
