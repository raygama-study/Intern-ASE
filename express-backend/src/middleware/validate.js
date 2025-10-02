const {validationResult} = require('express-validator')
const response = require('../helpers/response')

function validate(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return response(400, null, errors.array().map(err=>err.msg).join(', '), res)
    }
    next()
}

module.exports = validate