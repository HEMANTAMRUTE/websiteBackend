const Login = require('../Model/Login');
const express =require("express")

const router= express.Router();

router.post('/storeUserInfo' , async (req, res) => {
  try {
    const { userInfo } = req.body;
    console.log(userInfo)
    const login = new Login(userInfo);
    console.log(login);
    await login.save();
    res.status(200).send('Login info stored successfully');
    
  } catch (error) {
    res.status(500).send('Failed to store login info');
  }
});

router.get('/login-history',async (req, res) => {
  try {
    const loginHistory = await Login.find();
    res.status(200).json(loginHistory);
  } catch (error) {
    res.status(500).send('Failed to fetch login history');
  }
});

module.exports=router
