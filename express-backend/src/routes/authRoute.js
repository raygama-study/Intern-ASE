const express = require('express')
const router = express.Router()
//authentication
const authMiddleware = require('../middleware/authMiddleware')
//validator
const authValidator = require('../validators/authValidator')
const validate = require('../middleware/validate')
//controller
const authController = require('../controllers/authController')

router.post('/login', authValidator.loginValidator, validate, authController.login)

router.post('/register', authValidator.registerValidator, validate, authMiddleware, authController.register)

module.exports = router