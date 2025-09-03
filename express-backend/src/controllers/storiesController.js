const storyModel = require('../models/storiesModel')
const response = require('../helpers/response')
const imageModel = require('../models/imagesModel')
const storyReportModel = require('../models/storyReportsModel')
const {Filter} = require('content-checker')

const filter = new Filter({openModeratorAPIKey: process.env.OPEN_MODERATOR_API_KEY})

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
        const data = await storyModel.getAllStoriesStatus(`posted`)
        response(200, data, `get all stories`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to get all stories: ${error.message}`, res)
    }
}

async function getPostedStory(req, res){
    try{
        const {id} = req.params
        const data = await storyModel.getStoryByIdStatus(id, `posted`)
        if(!data){
            return response(404, null, `story not found`, res)
        }
        response(200, data, `get story with id: ${id}`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to get story: ${error.message}`, res)
    }
}

async function getHeldStories(req, res){
    try{
        const data = await storyModel.getAllStoriesStatus(`hold`)
        response(200, data, `get held stories`, res)
    } catch(error){
        console.error(error)
        response(500, null, `failed to get story: ${error.message}`, res)
    }
}

async function createStory(req, res){
    try{
        const {content, categoryIds = []} = req.body
        let status = `posted`
        let message = `story created successfully`

        const result = await filter.isProfaneAI(content, {provider: "google-perspective-api", checkManualProfanityList: true})

        if(result.profane){
            status = `hold`
            message = `story contains inappropriate content: ${result.type}`
        }

        const data = await storyModel.createStory(content, status, categoryIds)

        if(req.files && req.files.length > 0){
            const saveImagesPromises = req.files.map(file => imageModel.saveImage(data.id, file.filename))

            await Promise.all(saveImagesPromises)
        }

        if(result.profane){
            await storyReportModel.createStoryReport(data.id, message, true)
        }
        const newData = await storyModel.getStoryById(data.id)
        response(201, newData, message, res)
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
        const {deletionToken} = req.body

        const data = await storyModel.getStoryByToken(deletionToken)
        if(!data || data.status != `posted`){
            return response(404, null, `story not found`, res)
        }
        await storyModel.deleteStoryByStatus(data.id)
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
    getHeldStories,
    createStory,
    deleteStoryByStatus,
    updateStory,
    deleteStory
}