const response = require('../helpers/response')
const commentModel = require('../models/commentModel')
const {Filter} = require('content-checker')

const filter = new Filter({openModeratorAPIKey: process.env.OPEN_MODERATOR_API_KEY})

async function getAllComments(req, res) {
    try{
        const data = await commentModel.getComments({})
        response(200, data, `get all comments`, res)
    } catch(error){
        console.log(error)
        response(500, null, `failed to get comments: ${error.message}`)
    }
}

async function getCommentsByStory(req, res) {
    try{
        const {idStr} = req.params
        const data = await commentModel.getCommentsByStory(`posted`, idStr)
        response(200, data, `get all comments from story with id: ${idStr}`, res)
    } catch(error){
        console.log(error)
        response(500, null, `failed to get comments: ${error.message}`)
    }
}

async function createComment(req, res) {
    try{
        const {content} = req.body
        const {idStr} = req.params
        const data = await commentModel.createComment(content, idStr, `posted`)

        response(201, data, `comment created successfully`, res)
    } catch(error){
        console.log(error)
        response(500, null, `failed to create comment: ${error.message}`, res)
    }
}

module.exports = {
    getAllComments,
    getCommentsByStory,
    createComment
}