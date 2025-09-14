require('dotenv').config()

const express = require('express')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const app = express()
const user = require('./src/routes/user')
const auth = require('./src/routes/auth')
const banking = require('./src/routes/banking')

mongoose.connect(process.env.MONGODB_URI)
app.use(require('body-parser').json())
app.use(cookie())

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/banking', banking)

app.listen(3000)