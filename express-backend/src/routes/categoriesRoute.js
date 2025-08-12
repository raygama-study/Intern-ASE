const express = require('express')
const router = express.Router()
const response = require("../helpers/response")
const categoryController = require('../controllers/categoriesController')

router.get('/categories', categoryController.getCategories)

router.get('/categories/:id', categoryController.getCategory)

router.post('/categories', categoryController.createCategory)

router.delete('/categories/:id', (req, res) => {
    const {id} = req.params
    response(200, `categories with id: ${id} deleted`, "success", res)
})

router.put('/categories/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    response(200, `categories with id: ${id} name changed to ${name}`, "success", res)
})

module.exports = router