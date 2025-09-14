const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const commentsController = require('../controllers/commentsController')

// //get all comments
router.get('/comments', authMiddleware, commentsController.getAllComments)
router.get('/stories/:idStr/comments', commentsController.getCommentsByStory)

// //get specific comment
// router.get('/comments/held/:id', )
// router.get('/stories/:idStr/comments/:idCom', )

// //create comment
router.post('/stories/:idStr/comments', commentsController.createComment)

// //delete comment
// router.put('/stories/:idStr/comments/:idCom')

// //update comment
// router.put('/comments/:id', )

module.exports = router