const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const { LoginValidation, RegisterValidation } = require ('../middleware/validation')
const { v4: uuidv4 } = require('uuid')


router.post('/register',async (req, res) => {
    //we are just validating here
    const isNotValid = RegisterValidation(req.body)
    if (isNotValid) return res.status(400).json({message:isNotValid})

    const { password: inPass, firstName, lastName, email} = req.body
    const password = await bcrypt.hash(inPass, 10)

    const userId = uuidv4()

    const newUser = new User({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })

    try{
        const oldUser = await User.findOne({email: req.body.email})
        if (oldUser) return res.status(409).json({message: "User already registered"})

        if(newUser.save())res.status(200).json({message: "User registered Successfully", "userId": userId})

    }catch (error) {
        res.status(400).json({message:error})
    }

})


router.post('/login',async (req, res) => {
    try {
        const isNotValid = LoginValidation(req.body)
        if (isNotValid) return res.status(400).json({message: isNotValid})
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).json({message: "Email or Password is incorrect!"})
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(401).json({message: "Email or Password is incorrect"})
        const token = jwt.sign({userId: user.userId}, process.env.JWT_SECRETKEY, {
            expiresIn: process.env.JWT_EXPIRES
        })
        const cookieOptions = {
            httpOnly: true,
            expiresIn: new Date(Date.now() * process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
        }

        res.cookie('user', token, cookieOptions)
        res.status(200).json({message: "Logged In Successful", "token": token})
    }catch(error){
        res.status(404).json({message:error.message})
    }
})

module.exports = router
