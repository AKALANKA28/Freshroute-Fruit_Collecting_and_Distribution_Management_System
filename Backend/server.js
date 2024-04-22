
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const { errorHandler, notFound } = require("./middlewares/errorHandler.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const morgan = require("morgan")

const stripe = require("stripe")("sk_test_51P85tiKciT9oiVpgb9vlJdOnOVjTZOf3y0KGLObSVItsZVQWWPWQIzph7lv3NlVH6jtCBkwVQHfM1YXRYF0fSmmV00LNhhhQHo")

const authRouter = require('./routes/authRoute.js');
const productRouter = require('./routes/productRoute.js');
const categoryRouter = require('./routes/categoryRoute.js');
const enqRouter = require('./routes/enqRoute.js');

const salesRouter = require("./routes/finance/salesRoute");
const expenseRouter = require("./routes/finance/expenseRoute");
const FruitTypeRouter = require("./routes/coordinator/FruitTypeRoute.js");
const CategoryRouter = require("./routes/coordinator/CategoryRoute.js");
const SalaryRouter = require("./routes/coordinator/SalaryRoute.js");
const TransportFeeRouter = require("./routes/coordinator/TransportFeeRoute.js");
const cardsRouter = require("./routes/finance/cardsRoute.js");
const scheduleRouter = require("./routes/transport/scheduleRoute.js");
const vehicleRouter = require("./routes/transport/vehicleRoute.js");
const processRouter = require("./routes/transport/processRoute.js");
const coveringsRouter = require("./routes/transport/coveringsRoute.js");

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

const PromotionRouter = require("./routes/r_and_p/PromotionRoute.js");
const CompaignRouter = require("./routes/r_and_p/CompaignRoute.js");
const ResourceRouter = require("./routes/r_and_p/ResourceRoute.js");


const itemRouter = require("./routes/buyers/Bmanager");
const EmployeeRouter = require("./routes/StaffManager/EmployeeRoute.js");
// const qualityRoute = require("./routes/q_and_o/qualityRoute");
const CalculateSalaryRouter = require("./routes/StaffManager/CalculateSalaryRoute.js");
const NoticeRouter = require("./routes/StaffManager/NoticeRoute.js");

const orderMangerRoute = require("./routes/q_and_o/OrderManagerRoute");
const orderProcessorRoute = require("./routes/q_and_o/OrderProcessorRoute");


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// Connect to MongoDB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!!!");
});

// Use the routes
app.use('/user', authRouter);
app.use('/product', productRouter);
app.use('/productCategory', categoryRouter);
app.use('/enq', enqRouter);

app.use("/sales", salesRouter);
app.use("/expense", expenseRouter);
app.use("/cards", cardsRouter);
app.use("/FruitType", FruitTypeRouter);
app.use("/Category", CategoryRouter);
app.use("/Salary", SalaryRouter);

app.use('/schedule', scheduleRouter);
app.use('/vehicle', vehicleRouter);
app.use('/process', processRouter);
app.use('/coverings', coveringsRouter);

app.use("/Promotion", PromotionRouter);
app.use("/Compaign", CompaignRouter);
app.use("/Resource", ResourceRouter);



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

app.use(itemRouter);
app.use("/TransportFee", TransportFeeRouter);
app.use("/Employee", EmployeeRouter);
// app.use('/quality', qualityRoute);
app.use("/CalculateSalary", CalculateSalaryRouter);
app.use("/Notice", NoticeRouter);
app.use("/om", orderMangerRoute);
app.use("/op", orderProcessorRoute);





app.post("/user/checkout", async(req, res) => {
  const {product} = req.body;

  const lineItems = product.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.dish
      },
      unit_amount: product.price * 100,
    },
    quantity:product.qnty
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items:lineItems,
    mode: "payment",
    success_url:"",
    cancel_url:"",
  })
  res.json({id:session.id})

})


app.use(notFound);
app.use(errorHandler);
// Start the server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {

  console.log("\nYes Whotto Yes🥳\nDatabase Connected 😎\n");

  console.log(`Server is up and running on port: ${PORT}`);
});
