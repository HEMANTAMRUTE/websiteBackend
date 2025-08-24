const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("./db");
const router = require("./Routes/index");

const app = express();

// ✅ Use Render's dynamic PORT, fallback to 5000 locally
const PORT = process.env.PORT || 5000;

// ✅ Define CORS options once
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://main--internshalaclon.netlify.app"
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions));

// ✅ Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello, this is my backend");
});
app.use("/api", router);

// ✅ Database connection
connect();

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
df