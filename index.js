const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");
// const { browserAuthentication, deviceAndTimeBasedAccess } = require('./middleware/authentication');


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello This is My backend");
});

// app.use(browserAuthentication);
// app.use(deviceAndTimeBasedAccess);
app.use("/api", router);

// Connect to DB
connect();

// ✅ Fix CORS headers middleware (was using `req.header` incorrectly)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
