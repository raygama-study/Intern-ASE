const express = require('express')
const app = express()
const router = express.Router()
const response = require("../helpers/response")

app.use(express.json())

router.post('/stories/report/:id', (req, res) => {
    const {id} = req.params
    response(200, `story with id: ${id} reported`, "success", res)
})

module.exports = router