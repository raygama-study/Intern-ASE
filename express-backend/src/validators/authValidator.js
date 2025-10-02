const {body} = require('express-validator')

const registerValidator = [
    body('name')
        .notEmpty().withMessage('name is required'),
    
    body('username')
        .notEmpty().withMessage('username is required')
        .isLength({min: 3}).withMessage('username must be at least 4 characters'),

    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({min:8}).withMessage('password must be at least 8 characters')
]

const loginValidator = [
    body('username')
        .notEmpty().withMessage('username is required'),

    body('password')
        .notEmpty().withMessage('password is required')
]

module.exports = {
    registerValidator,
    loginValidator
}