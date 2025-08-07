const express = require('express')
const router = express.Router()
const response = require("../helpers/response")

router.get('/categories', (req, res) => {
  response(200, `get all categories`, "success", res)
})

router.get('/categories/:id', (req,res) => {
    const {id} = req.params
    response(200, `get categories with id: ${id}`, "success", res)
})

router.post('/categories', (req, res) => {
    const {name} = req.body
    response(200, `category with name: ${name} posted`, "success", res)
})

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