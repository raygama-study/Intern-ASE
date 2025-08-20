const {body} = require('express-validator')

const storyValidator = [
    body('content')
        .notEmpty().withMessage('content is required'),
    body('status')
        .isIn(['posted','hold','deleted']).withMessage('invalid status'),
    body('categoryIds')
        .customSanitizer((value, {req})=>{
            if(!req.body.categoryIds) return [];
            return Array.isArray(req.body.categoryIds)
                ? req.body.categoryIds
                : [req.body.categoryIds];
        })
        .isArray().withMessage('categoryIds must be an array')
]

module.exports = {
    storyValidator
}