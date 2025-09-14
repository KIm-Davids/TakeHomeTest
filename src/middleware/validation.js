const Joi = require('@hapi/joi')
const RegisterValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const { error } = schema.validate(data)
    if (error) return error.details[0].message

}
const LoginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = schema.validate(data)
    if (error) return error.details[0].message
}

const UpdateUserValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    })

    const { error } = schema.validate(data)
    if (error) return error.details[0].message
}

module.exports = { LoginValidation, RegisterValidation, UpdateUserValidation }