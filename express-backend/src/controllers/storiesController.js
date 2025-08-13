const storyModel = require('../models/storiesModel')
const response = require('../helpers/response')
const imageModel = require('../models/imagesModel')

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

async function getPostedStories(req, res){
    try{
        const data = await storyModel.getAllPostedStories()
        response(200, data, `get all stories`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to get all stories: ${error.message}`, res)
    }
}

async function getPostedStory(req, res){
    try{
        const {id} = req.params
        const data = await storyModel.getPostedStoryById(id)
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

        if(req.files && req.files.length > 0){
            const saveImagesPromises = req.files.map(file => imageModel.saveImage(data.id, file.filename))

            await Promise.all(saveImagesPromises)
        }

        const newData = await storyModel.getStoryById(data.id)
        response(201, newData, `story created successfully`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to create story: ${error.message}`, res)
    }
}

async function updateStory(req, res){
    try{
        const {id} = req.params
        const {status} = req.body

        const data = await storyModel.updateStory(id, status)
        response(200, data, `story updated successfully`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to update story`, res)
    }
}

async function deleteStoryByStatus(req, res){
    try{
        const {id} = req.params
        const deletionToken = req.body?.deletionToken;
        if (!deletionToken) {
            return response(400, null, `missing deletion token`, res);
        }
        const data = await storyModel.getStoryById(id)
        if(data.deletion_token != deletionToken){
            return response(401, null, `invalid deletion token`, res)
        }
        await storyModel.deleteStoryByStatus(id)
        response(200, null, `story deleted successfully`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to delete story: ${error.message}`, res)
    }
}

async function deleteStory(req, res){
    try{
        const {id} = req.params
        
        const data = await storyModel.getStoryById(id)
        if(!data){
            return response(404, null, `story not found`, res)
        }
        await storyModel.deleteStory(id)
        response(200, null, `story deleted successfully`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to delete story`, res)
    }
}

module.exports = {
    getStories,
    getStory,
    getPostedStories,
    getPostedStory,
    createStory,
    deleteStoryByStatus,
    updateStory,
    deleteStory
}