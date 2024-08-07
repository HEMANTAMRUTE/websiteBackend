const express = require('express');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const router= express.Router();






const otps = {};

router.post('/generate-otp', (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  otps[email] = otp; // Store OTP for later verification

  res.status(200).send({ otp });
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otps[email] === otp) {
    delete otps[email]; // OTP is verified, remove it
    return res.status(200).send('OTP verified');
  }

  res.status(400).send('Invalid OTP');
});

module.exports=router
