const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const { errorHandler, notFound } = require("./middlewares/errorHandler.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


//Akalanka
const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoute.js");
const categoryRouter = require("./routes/categoryRoute.js");
const enqRouter = require("./routes/enqRoute.js");
const gradeRouter = require("./routes/gradeRoute.js");

const revenueRouter = require("./routes/finance/revenueRoute");
const salesRouter = require("./routes/finance/salesRoute");
const expenseRouter = require("./routes/finance/expenseRoute");

//Aashani
const scheduleRouter = require("./routes/transport/scheduleRoute.js");
const vehicleRouter = require("./routes/transport/vehicleRoute.js");
const processRouter = require("./routes/transport/processRoute.js");
const coveringsRouter = require("./routes/transport/coveringsRoute.js");

//Nadil
const FruitTypeRouter = require("./routes/coordinator/FruitTypeRoute.js");
const CategoryRouter = require("./routes/coordinator/CategoryRoute.js");
const SalaryRouter = require("./routes/coordinator/SalaryRoute.js");
const TransportFeeRouter = require("./routes/coordinator/TransportFeeRoute.js");
const cardsRouter = require("./routes/finance/cardsRoute.js");

//Heshan
const farmerRouter = require("./routes/farmers/farmerRoutes");
const predictionRouter = require("./routes/farmers/predictionRoutes");
const pendingSupplyRouter = require("./routes/farmers/pendingSuppliesRoutes");
const acceptedSupplyRouter = require("./routes/farmers/acceptedSuppliesRoutes");
const declinedSupplyRouter = require("./routes/farmers/declinedSuppliesRoutes");
const joiningRequestRouter = require("./routes/joiningRequestRoutes.js");
const pendingSupplierRouter = require("./routes/farmers/pendingSuppliersRoutes.js");
const acceptedSupplierRouter = require("./routes/farmers/acceptedSuppliersRoutes.js");
const declinedSupplierRouter = require("./routes/farmers/declinedSuppliersRoutes.js");

//Dilmi
const PromotionRouter = require("./routes/r_and_p/PromotionRoute.js");
const CompaignRouter = require("./routes/r_and_p/CompaignRoute.js");
const ResourceRouter = require("./routes/r_and_p/ResourceRoute.js");
//const AccResourceRouter = require("./routes/r_and_p/AccResourceRoute.js");

//Esendi
const itemRouter = require("./routes/buyers/Bmanager");
const EmployeeRouter = require("./routes/StaffManager/EmployeeRoute.js");
const UnregisteredRouter = require("./routes/StaffManager/UnregisteredRoute.js");
// const qualityRoute = require("./routes/q_and_o/qualityRoute");
const CalculateSalaryRouter = require("./routes/StaffManager/CalculateSalaryRoute.js");
const NoticeRouter = require("./routes/StaffManager/NoticeRoute.js");
const MessageRouter = require("./routes/StaffManager/MessageRoute.js");

//Sasanka
const orderMangerRoute = require("./routes/q_and_o/OrderManagerRoute");
const orderProcessorRoute = require("./routes/q_and_o/OrderProcessorRoute");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// Connect to MongoDB------------------------------------
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!!!");
});

// Use the routes------------------------------------------

//Akalanka
app.use("/user", authRouter);
app.use("/product", productRouter);
app.use("/productCategory", categoryRouter);
app.use("/enq", enqRouter);
app.use("/grade", gradeRouter);
app.use("/revenue", revenueRouter);
app.use("/sales", salesRouter);
app.use("/expense", expenseRouter);
app.use("/cards", cardsRouter);

//Aashani
app.use("/schedule", scheduleRouter);
app.use("/vehicle", vehicleRouter);
app.use("/process", processRouter);
app.use("/coverings", coveringsRouter);

//Nadil
app.use("/FruitType", FruitTypeRouter);
app.use("/Category", CategoryRouter);
app.use("/Salary", SalaryRouter);


//Dilmi
app.use("/Promotion", PromotionRouter);
app.use("/Compaign", CompaignRouter);
app.use("/Resource", ResourceRouter);
//app.use("/AccResource", AccResourceRouter);

//Heshan
app.use("/Farmer", farmerRouter);
app.use("/Prediction", predictionRouter);
app.use("/pendingSupply", pendingSupplyRouter);
app.use("/acceptedSupply", acceptedSupplyRouter);
app.use("/declinedSupply", declinedSupplyRouter);
app.use("/JoiningRequest", joiningRequestRouter);
app.use("/pendingSupplier", pendingSupplierRouter);
app.use("/acceptedSupplier", acceptedSupplierRouter);
app.use("/declinedSupplier", declinedSupplierRouter);


//Esendi
app.use(itemRouter);
app.use("/TransportFee", TransportFeeRouter);
app.use("/Employee", EmployeeRouter);
app.use("/Unregistered", UnregisteredRouter);
// app.use('/quality', qualityRoute);
app.use("/CalculateSalary", CalculateSalaryRouter);
app.use("/Notice", NoticeRouter);
app.use("/Message", MessageRouter);

//Sasanka
app.use("/om", orderMangerRoute);
app.use("/op", orderProcessorRoute);

app.use(notFound);
app.use(errorHandler);

// Start the server----------------------------------------
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  console.log("\nDatabase Connected 😎\n");

  console.log(`Server is up and running on port: ${PORT}`);
});
