const router = require('express').Router()
const { createVirtualAccount } = require('../services/safehavenApi')

router.post('/virtual-account', async (req, res) => {
    try {
        const account = await createVirtualAccount();
        res.status(201).json({success: true, account})
    }catch(err){
        res.status(500).json({success: false, message: 'could not create virtual account', data: err.data})
    }
})

module.exports = router