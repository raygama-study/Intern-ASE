const express = require('express')
const router = express.Router()
const response = require("../helpers/response")

router.get('/ping', (req, res) => {
  response(200, "no data", "pong", res)
})

module.exports = router