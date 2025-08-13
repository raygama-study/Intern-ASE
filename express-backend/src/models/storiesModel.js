const {PrismaClient} = require('../generated/prisma')
const prisma = new PrismaClient()
const crypto = require('crypto')

async function getAllStories(){
    return prisma.stories.findMany({
        include: {
            story_categories: {
                include: {
                    categories: true
                }
            },
            images: true
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
            },
            images: true
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
            },
            images: true
        }
    })
}

module.exports = {
    getAllStories,
    getStoryById,
    createStory
}