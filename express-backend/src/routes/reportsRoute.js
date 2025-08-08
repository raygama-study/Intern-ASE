const express = require('express')
const app = express()
const router = express.Router()
const response = require("../helpers/response")

app.use(express.json())

router.get('/reports/stories', (req, res) => {
    response(200, `get all story reports`, "success", res)
})

router.get('/reports/comments', (req, res) => {
    response(200, `get all comment reports`, "success", res)
})

router.get('/reports/stories/:id', (req, res) => {
    const {id} = req.params
    response(200, `get story reports with id: ${id}`, "success", res)
})

router.get('/reports/comments/:id', (req, res) => {
    const {id} = req.params
    response(200, `get comment reports with id: ${id}`, "success", res)
})

router.post('/stories/:id/report', (req, res) => {
    const {id} = req.params
    response(200, `story with id: ${id} reported`, "success", res)
})

router.post('/comments/:id/report', (req, res) => {
    const {id} = req.params
    response(200, `comment with id: ${id} reported`, "success", res)
})

router.put('/reports/stories/:id', (req, res) => {
    const {id} = req.params
    const {status} = req.body
    response(200, `story reports with id: ${id} status changed to: ${status}`, "success", res)
})

router.put('/reports/comments/:id', (req, res) => {
    const {id} = req.params
    const {status} = req.body
    response(200, `get comment reports with id: ${id} status changed to ${status}`, "success", res)
})

module.exports = router