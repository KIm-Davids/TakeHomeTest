require('dotenv').config();
const axios = require('axios')

const API_BASE = "https://api.sandbox.safehavenmfb.com"
const TOKEN = process.env.SAFEHAVEN_API_KEY;

// async function authenticate(){
//     try{
//         const response = await axios.post(`${API_BASE}/accounts/subaccount`, {
//             apiKey: process.env.SAFEHAVEN_API_KEY
//         });
//         return response.data.token;
//     }catch(err){
//         console.log("Auth failed", err)
//     }
// }

async function createVirtualAccount() {
    try{
        const response = await axios.post(
            `${API_BASE}/virtual-accounts`,
            {
                validFor: 10900,
                settlementAccount: { bankCode: "090286" },
                amountControl: "Fixed",
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }catch (error) {
        console.error('Error creating virtual account', error.data.message, error)
    }
}

module.exports = { createVirtualAccount }