require('dotenv').config()

const express = require('express')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const app = express()
const userAuth = require('./src/routes/user')

mongoose.connect(process.env.MONGODB_URI)
app.use(require('body-parser').json())
app.use(cookie())

app.use('/api/auth', userAuth)

app.listen(3000)