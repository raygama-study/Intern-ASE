const express = require('express')
const router = express.Router()
//authentication
const authMiddleware = require('../middleware/authMiddleware')
//validator
const categoriesValidator = require('../validators/categoriesValidator')
const validate = require('../middleware/validate')
//controller
const categoryController = require('../controllers/categoriesController')

router.get('/categories', categoryController.getCategories)

router.get('/categories/:id', categoryController.getCategory)

router.post('/categories', categoriesValidator.categoryValidator, authMiddleware, categoryController.createCategory)

router.delete('/categories/:id', categoriesValidator.categoryValidator, validate, authMiddleware, categoryController.deleteCategory)

router.put('/categories/:id', categoriesValidator.categoryValidator, validate, authMiddleware, categoryController.updateCategory)

module.exports = router