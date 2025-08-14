const {body} = require('express-validator')

const categoryValidator = [
    body('name')
        .notEmpty().withMessage('name is required')
]

module.exports = {
    categoryValidator
}