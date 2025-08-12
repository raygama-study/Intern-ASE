const express = require('express')
const app = express()
const router = express.Router()
const response = require("../helpers/response")
const storyController = require('../controllers/storiesController')

app.use(express.json())

router.get('/stories', storyController.getStories)

router.get('/stories/:id', storyController.getStory)

router.post('/stories', storyController.createStory)

router.put('/stories/:id', (req, res) => {
    const {id} = req.params
    const {status} = req.body
    response(200, `story with id ${id} status changed to ${status}`, "success", res)
})

module.exports = router