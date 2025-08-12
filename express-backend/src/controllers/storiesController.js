const storyModel = require('../models/storiesModel')
const response = require('../helpers/response')

async function getStories(req, res){
    try{
        const data = await storyModel.getAllStories()
        response(200, data, `get all stories`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to get all stories: ${error.message}`, res)
    }
}

async function getStory(req, res){
    try{
        const {id} = req.params
        const data = await storyModel.getStoryById(id)
        if(!data){
            return response(404, null, `story not found`, res)
        }
        response(200, data, `get story with id: ${id}`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to get story: ${error.message}`, res)
    }
}

async function createStory(req, res){
    try{
        const {content, status, categoryIds} = req.body
        const data = await storyModel.createStory(content, status, categoryIds)
        response(201, data, `story created successfully`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to create story: ${error}`, res)
    }
}

module.exports = {
    getStories,
    getStory,
    createStory
}