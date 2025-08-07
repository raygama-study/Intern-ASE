const express = require('express')
const app = express()
const router = express.Router()
const response = require("../helpers/response")

app.use(express.json())

router.get('/stories', (req,res)=> {
    response(200, `get all stories data`, "success", res)
})

router.get('/stories/:id', (req,res) => {
    const {id} = req.params
    response(200, `get story data with id ${id}`, "success", res)
})

router.post('/stories', (req,res) => {
    const {id, content} = req.body
    response(200, `post story id: ${id}, content: ${content}`, "success", res)
})

router.put('/stories/:id', (req, res) => {
    const {id} = req.params
    const {status} = req.body
    response(200, `story with id ${id} status changed to ${status}`, "success", res)
})

module.exports = router