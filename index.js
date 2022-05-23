var express = require("express");
var app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;
const { MONGOURI } = require("./config/keys");
const cors=require("cors");

//MiddleWare for CORS policy
app.use(cors());
app.use(cors({
    origin: '*'
}));
app.use(function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Checking Coonection
mongoose.connection.on("connected", () => {
  console.log("Connected to the Database");
});
mongoose.connection.on("error", (err) => {
  console.log("Error Connecting", err);
});

require("./models/inventory");
//Middleware for Express
app.use(express.json());
app.use(require("./routes/items"));
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
