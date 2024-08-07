// Assuming you're using Express.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post('/send-sms', (req, res) => {
    const { to, body } = req.body;

    if (!to || !body) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    client.messages
        .create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        })
        .then((message) => res.status(200).send({ sid: message.sid }))
        .catch((error) => {
            console.error('Error sending SMS:', error);
            res.status(500).send({ error: 'Failed to send SMS', details: error.message });
        });
});


module.exports = router;
