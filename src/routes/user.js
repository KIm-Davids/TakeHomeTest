const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const { UpdateUserValidation } = require ('../middleware/validation')
const { v4: uuidv4 } = require('uuid')


router.put('/profile', async (req, res) => {
    if(!req.cookies.user) return res.status(404).json({message:"Please ensure you're logged in"})
    let verifyUser
    try {
        verifyUser = jwt.verify(
            req.cookies.user,
            process.env.JWT_SECRETKEY
            )
    }catch (err){
        return res.status(404).json({message: "Please ensure you're logged in!"});
    }

    const isNotValid = UpdateUserValidation(req.body)
    if(isNotValid) return res.status(400).json({message: "Please enter valid data!"})

    const {firstName, lastName} = req.body
    const result = await User.updateOne({userId: verifyUser.userId}, {$set: {firstName, lastName, updatedAt: new Date()}})
    if (result.matchedCount === 0) return res.status(404).json({message: "User not found!"})
    else {
        return res.status(200).json({message: "Profile updated successfully"})
    }
})

router.get('/profile', async (req, res) => {
    if(!req.cookies.user) return res.status(404).json({message: "Please ensure you're logged in"})
    let verifyUser
    try{
        verifyUser = jwt.verify(
            req.cookies.user,
            process.env.JWT_SECRETkEY
        )
    }catch(err){
        return res.status(404).json({message: "Please ensure you're logged in!"})
    }

    try{
        const user = await User.findOne({userId: verifyUser.userId})
            .select('firstName lastName email virtualAccountNumber')
            .lean()
        if(user) return res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            })
        else return res.status(404).json({message: "User not found!"})
    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message})
    }
})

module.exports = router
