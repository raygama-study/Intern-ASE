const express = require('express')
const app = express()
const router = express.Router()
const response = require("../helpers/response")
const storyController = require('../controllers/storiesController')
const upload = require('../middleware/uploadImage')

app.use(express.json())

router.get('/stories', storyController.getStories)

router.get('/stories/:id', storyController.getStory)

router.post('/stories', upload.array('images', 4), storyController.createStory)

router.put('/stories/:id', storyController.updateStory)

router.put('/stories/:id/delete', storyController.deleteStoryByStatus)

module.exports = router