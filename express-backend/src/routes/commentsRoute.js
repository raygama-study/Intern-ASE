const express = require('express')
const router = express.Router()
const response = require("../helpers/response")

router.get('/comments', (req, res) => {
  response(200, `get all comments`, "success", res)
})

router.get('/stories/:id/comments', (req,res) => {
    const {id} = req.params
    response(200, `get all comments for stories with id: ${id}`, "success", res)
})

router.get('/comments/:id', (req, res) => {
    const {id} = req.params
    response(200, `get comment with id: ${id}`, "success", res)
})

router.post('/stories/:id/comments', (req, res) => {
    const {id} = req.params
    const {content} = req.body
    response(200, `posted comment with content: ${content} for story with id: ${id}`, "success", res)
})

router.put('/comments/:id', (req, res) => {
    const {id} = req.params
    const {status} = req.body
    response(200, `comment with id: ${id} status changed to: ${status}`, "success", res)
})

module.exports = router