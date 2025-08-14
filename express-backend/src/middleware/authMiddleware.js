const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

function authMiddleware(req, res, next){
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token){
        return response(401, null, `Access denied`, res)
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(error){
        return response(403, null, `invalid or expired token`, res)
    }
}

module.exports = authMiddleware