
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

const authRouter = require('./routes/authRoute.js');
const productRouter = require('./routes/productRoute.js');
const categoryRouter = require('./routes/categoryRoute.js');
const enqRouter = require('./routes/enqRoute.js');

const salesRouter = require("./routes/finance/salesRoute");
const expenseRouter = require("./routes/finance/expenseRoute");
const FruitTypeRouter = require("./routes/coordinator/FruitTypeRoute.js");
const SalaryRouter = require("./routes/coordinator/SalaryRoute.js");
const TransportFeeRouter = require("./routes/coordinator/TransportFeeRoute.js");
const cardsRouter = require("./routes/finance/cardsRoute.js");
const scheduleRouter = require("./routes/transport/scheduleRoute.js");
const vehicleRouter = require("./routes/transport/vehicleRoute.js");
const processRouter = require("./routes/transport/processRoute.js");
const coveringsRouter = require("./routes/transport/coveringsRoute.js");
const router = require("./routes/farmers/farmerRoutes");
const itemRouter = require("./routes/buyers/Bmanager")
const EmployeeRouter = require("./routes/StaffManager/EmployeeRoute.js");
const qualityRoute = require("./routes/q_and_o/qualityRoute");
const CalculateSalaryRouter = require("./routes/StaffManager/CalculateSalaryRoute.js");

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
app.use("/Salary", SalaryRouter);
app.use('/schedule', scheduleRouter);
app.use('/vehicle', vehicleRouter);
app.use('/process', processRouter);
app.use('/coverings', coveringsRouter);
app.use('/Farmer', router);
app.use(itemRouter);
app.use("/TransportFee", TransportFeeRouter);
app.use("/Employee", EmployeeRouter);
app.use('/quality', qualityRoute);
app.use("/CalculateSalary", CalculateSalaryRouter);


app.use(notFound);
app.use(errorHandler);
// Start the server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {

  console.log("\nYes Whotto Yes🥳\nDatabase Connected 😎\n");

  console.log(`Server is up and running on port: ${PORT}`);
});
