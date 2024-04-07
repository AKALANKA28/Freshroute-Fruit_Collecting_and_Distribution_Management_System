const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require('./emailController');


// Register a User
exports.registerUser = asyncHandler(async( req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email});
  if(!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  }else{
    throw new Error('User Already Exists');
  }
});


// Login a User
exports.loginController = asyncHandler( async (req, res) =>{
  const {email, password} = req.body;
  const findUser = await User.findOne ({ email });
  if (findUser && await findUser.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateduser = await User.findByIdAndUpdate(findUser.id, {
      refreshToken : refreshToken
    },{ new:true }
  );
  res.cookie("refreshToken", refreshToken,{
  httpOnly: true,
  maxAge: 72 * 60 * 60 * 1000,
});
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?. mobile,
      token:generateToken(findUser?._id),
    })
  } else {
    throw new Error ("Invalid Credentials");
  }

});


//Logout
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
  await User.findOneAndUpdate({refreshToken}, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
   res.sendStatus(204); // forbidden
});


//Get All Users
exports.getAllUsers = asyncHandler( async(req, res) =>{
  try {
    const getAllUsers = await User.find();
    res.json(getAllUsers);
} catch (error) {
    throw new Error(error)
}
});



//Get user by id
exports.getUserById = asyncHandler( async(req, res) =>{
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



//Update a User
exports.updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(id)
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


//Delete a User
exports.deleteUser = asyncHandler( async(req, res) =>{
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

// handle refresh token
exports.handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken)
   throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

  if (!user) 
    throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
    const accessToken = generateToken(user?._id);
     res.json({ accessToken });
  });
});



//Block  User
exports.blockUser = asyncHandler( async(req, res) =>{
  const {id} = req.params;
  validateMongoDbId(id);

  try{
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
     }
    );
  }catch (error){
    throw new Error(error);
  }
});

//Unblock User
exports.unblockUser = asyncHandler( async(req, res) =>{
  const {id} = req.params;
  validateMongoDbId(id);

  try{
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
     }
    );
  }catch (error){
    throw new Error(error);
  }
});


//update password
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

 
//forgot password
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


//reset password
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
