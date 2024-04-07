const express=require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginController);
router.post("/forgot-password-token", userController.forgotPasswordToken);
router.post('/reset-password/:token', userController.resetPassword);

router.get("/logout", userController.logout);
router.get('/', userController.getAllUsers);
router.get("/get/:id", authMiddleware, userController.getUserById);
router.get("/refresh", userController.handleRefreshToken);

router.put("/update/:id", authMiddleware, userController.updatedUser);
router.put("/block/:id", authMiddleware, isAdmin, userController.blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, userController.unblockUser);
router.put("/password", authMiddleware, userController.updatePassword);

router.delete("/delete/:id", userController.deleteUser);


module.exports = router;