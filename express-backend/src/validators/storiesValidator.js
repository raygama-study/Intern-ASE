const {body} = require('express-validator')

const storyValidator = [
    body('content')
        .notEmpty().withMessage('content is required'),
    body('status')
        .isIn(['posted','hold','deleted']).withMessage('invalid status'),
    body('categoryIds').optional().isArray().withMessage('categoryIds must be an array')
]

module.exports = {
    storyValidator
}