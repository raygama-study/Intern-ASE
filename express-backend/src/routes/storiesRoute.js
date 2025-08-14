const express = require('express')
const app = express()
const router = express.Router()
const storyController = require('../controllers/storiesController')
const upload = require('../middleware/uploadImage')
const authMiddleware = require('../middleware/authMiddleware')

app.use(express.json())

//get all stories
router.get('/stories', authMiddleware, storyController.getStories)
router.get('/stories/posted', storyController.getPostedStories)

//get specific story
router.get('/stories/:id', authMiddleware, storyController.getStory)
router.get('/stories/posted/:id', storyController.getPostedStory)

//create story
router.post('/stories', upload.array('images', 4), storyController.createStory)

//update story
router.put('/stories/:id', storyController.updateStory)

//delete story (by status dan hard delete)
router.put('/stories/:id/delete', storyController.deleteStoryByStatus)
router.delete('/stories/:id', authMiddleware, storyController.deleteStory)

module.exports = router