const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const salesRouter = require("./routes/finance/salesRoute");
const expenseRouter = require("./routes/finance/expenseRoute");
const cardsRouter = require("./routes/finance/cardsRoute.js");
const scheduleRouter = require("./routes/transport/scheduleRoute.js");
const vehicleRouter = require("./routes/transport/vehicleRoute.js");
const processRouter = require("./routes/transport/processRoute.js");
const coveringsRouter = require("./routes/transport/coveringsRoute.js");

const FruitTypeRouter = require("./routes/coordinator/FruitTypeRoute.js");




app.use(cors());
app.use(bodyParser.json());


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
app.use('/sales', salesRouter);
app.use('/expense', expenseRouter);
app.use('/cards', cardsRouter);
app.use('/schedule', scheduleRouter);
app.use('/vehicle', vehicleRouter);
app.use('/process', processRouter);
app.use('/coverings', coveringsRouter);


app.use("/FruitType", FruitTypeRouter);


// Start the server
const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
