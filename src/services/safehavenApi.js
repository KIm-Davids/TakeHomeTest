require('dotenv').config();
const fs = require('fs')
const axios = require('axios')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const PRIVATE_KEY = fs.readFileSync('./keys/privatekey.pem', 'utf-8');
const API_LINK = "https://api.sandbox.safehavenmfb.com/virtual-accounts"
const TOKEN = process.env.SAFEHAVEN_API_KEY;
const CLIENT_ID = process.env.CLIENT_ID;


async function getApiToken(){
    try{
        const payload = {
            iss: CLIENT_ID,
            sub: CLIENT_ID,

        }
    }catch (e) {
        
    }
}


async function createVirtualAccount() {
    try{
        const response = await axios.post(
            `${API_LINK}`,
            {
                validFor: 900,
                settlementAccount: {
                    bankCode: "090286",
                    accountNumber: "9114142374"
                },
                amountControl: "Fixed",
                callbackUrl: "http://localhost:3000/",
                amount: 1000,
                currency: "NGN",
                externalReference: "txn-" + Date.now()
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    clientID: process.env.CLIENT_ID,
                    'content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }catch (error) {
        console.log('Error creating virtual account', error)
    }
}

module.exports = { createVirtualAccount }