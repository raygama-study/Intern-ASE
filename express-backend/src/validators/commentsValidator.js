const {body} = require('express-validator')

const commentValidator = [
    body('content')
        .notEmpty().withMessage('content is required')
]

module.exports = {
    commentValidator
}