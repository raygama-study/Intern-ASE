const express = require('express')
const app = express()
const router = express.Router()
//authentication
const authMiddleware = require('../middleware/authMiddleware')
//validator
const storiesValidator = require('../validators/storiesValidator')
const validate = require('../middleware/validate')
//controller
const storyController = require('../controllers/storiesController')

const upload = require('../middleware/uploadImage')

app.use(express.json())

//get all stories
router.get('/stories', authMiddleware, storyController.getStories)
router.get('/stories/posted', storyController.getPostedStories)
router.get('/stories/flagged', authMiddleware, storyController.getFlaggedStories)

//get specific story
router.get('/stories/flagged/:id', authMiddleware, storyController.getStory)
router.get('/stories/posted/:id', storyController.getPostedStory)
router.get('/stories/delete', storyController.getStoryByToken)

//create story
router.post('/stories', upload.upload.array('images', 4), upload.removeExifMiddleware, storiesValidator.storyValidator, validate, storyController.createStory)

//delete story (by status dan hard delete)
router.put('/stories/delete', storiesValidator.deleteStoryValidator, validate, storyController.deleteStoryByToken)
router.delete('/stories/:id', authMiddleware, storyController.deleteStory)

//flag story
router.put('/stories/posted/:id/flag', storyController.flagStory)
router.put('/stories/flagged/:id/unflag', authMiddleware, storyController.unflagStory)

module.exports = router