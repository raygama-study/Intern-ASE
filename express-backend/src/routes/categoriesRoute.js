const express = require('express')
const router = express.Router()
const response = require("../helpers/response")
const categoryController = require('../controllers/categoriesController')

router.get('/categories', categoryController.getCategories)

router.get('/categories/:id', categoryController.getCategory)

router.post('/categories', categoryController.createCategory)

router.delete('/categories/:id', categoryController.deleteCategory)

router.put('/categories/:id', categoryController.updateCategory)

module.exports = router