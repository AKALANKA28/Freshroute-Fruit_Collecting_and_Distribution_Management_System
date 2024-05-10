const express=require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const paymentController = require("../controllers/paymentController");

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginController);
router.post('/admin-login', userController.loginAdmin);
router.post("/forgot-password-token", userController.forgotPasswordToken);
router.post('/cart', authMiddleware, userController.userCart);
router.post('/order', authMiddleware, userController.createOrder);
router.post('/create-checkout-session', paymentController.checkout);
// router.post('/order/paymentVerification', authMiddleware, paymentController.paymentVerification);

router.get('/', userController.getAllUsers);
router.get("/get/:id", authMiddleware, userController.getUserById);
router.get("/refresh", userController.handleRefreshToken);
router.get("/logout", userController.logout);
router.get('/get-cart', authMiddleware, userController.getUserCart);

router.put("/update/:id", authMiddleware, userController.updatedUser);
router.put("/password", authMiddleware, userController.updatePassword);
router.put('/reset-password/:token', userController.resetPassword);
router.put("/block/:id", authMiddleware, isAdmin, userController.blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, userController.unblockUser);
router.put("/save-address", authMiddleware, userController.saveAddress);
router.put('/update-product-from-cart/:newQuantity', authMiddleware, userController.updateProductQuantityFromCart);
router.put('/order/update/:id', authMiddleware, isAdmin, userController.updateOrderStatus)

router.delete("/delete/:id", userController.deleteUser);
router.delete('/delete-product-from-cart/:cartItemId', authMiddleware, userController.removeProductFromCart);
router.delete('/empty-cart', authMiddleware, userController.emptyCart);
router.delete('/order/delete/:id', userController.deleteOrder);


router.get('/allorders',  userController.getAllOrders)
router.get('/getsingleorder/:id', authMiddleware, isAdmin, userController.getSingleOrder)

// router.post('/cart',  userController.userCart);
// router.get('/get-cart', userController.getUserCart);
// router.delete('/empty-cart', userController.emptyCart);


// router.post('/order',  userController.createOrder);

// router.get('/order/', authMiddleware, userController.getAllOrders);
// router.get('/order/:id', authMiddleware, userController.getOrderByUserId);
// router.put('/update-status/:id', authMiddleware, isAdmin, userController.updateOrderStatus);



module.exports = router;