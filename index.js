const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { connect } = require('./db');
const router = require('./Routes/index');

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, this is my backend');
});
app.use('/api', router);

// Database connection
connect();
app.use((req,res,next)=>{
  req.header("Acess-Control-Allow-Origin","*")
  res.header("Acess-Control-Allow-Origin","*")
  next()
})
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
