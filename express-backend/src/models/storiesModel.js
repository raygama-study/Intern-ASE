const {PrismaClient} = require('../generated/prisma')
const { connect } = require('../routes/storiesRoute')
const prisma = new PrismaClient()
const crypto = require('crypto')

async function getAllStories(){
    return prisma.stories.findMany({
        include: {
            story_categories: {
                include: {
                    categories: true
                }
            }
        }
    })
}

async function getStoryById(id){
    return prisma.stories.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            story_categories: {
                include: {
                    categories: true
                }
            }
        }
    })
}

async function createStory(content, status, categoryIds){
    const deletionToken = crypto.randomBytes(4).toString('hex')
    return prisma.stories.create({
        data: {
            content,
            status,
            deletion_token: deletionToken,
            story_categories: {
                create: categoryIds.map(catId => ({
                    categories: {
                        connect: {id: Number(catId)}
                    }
                }))
            }
        },
        include: {
            story_categories: {
                include: {
                    categories: true
                }
            }
        }
    })
}

module.exports = {
    getAllStories,
    getStoryById,
    createStory
}