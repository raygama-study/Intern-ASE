const express = require('express')
const router = express.Router()
const response = require("../helpers/response")

router.post('/login', (req, res) => {
    const {username, password} = req.body
    response(200, `login with username: ${username}, password: ${password}`, "pong", res)
})

router.post('/register', (req, res) => {
    const {username, password} = req.body
    response(200, `register with username: ${username}, password: ${password}`, "pong", res)
})

module.exports = router