const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    userId: {
        type: String,
        unique:true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    virtualAccountNumber: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }

})

 module.exports = mongoose.model('user', UserSchema)