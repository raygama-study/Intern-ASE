const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

const authValidator = require('../validators/authValidator')
const validate = require('../middleware/validate')

router.post('/login', authValidator.loginValidator, validate, authController.login)

router.post('/register', authValidator.registerValidator, validate, authMiddleware, authController.register)

module.exports = router