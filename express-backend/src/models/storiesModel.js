const {PrismaClient} = require('../generated/prisma')
const prisma = new PrismaClient()
const crypto = require('crypto')

async function getAllPostedStories(){
    return prisma.stories.findMany({
        where: {
            status: 'posted'
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

async function getPostedStoryById(id){
    return prisma.stories.findFirst({
        where: {
            id: Number(id),
            status: 'posted'
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
    return prisma.stories.findFirst({
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

async function updateStory(id, status){
    return prisma.stories.update({
        where: {
            id: Number(id),
            status: 'posted'
        },
        data: {
            status: status
        }
    })
}

async function deleteStoryByStatus(id){
    return prisma.stories.update({
        where: {
            id: Number(id),
            status: 'posted'
        },
        data: {
            status: 'deleted',
            deleted_at: new Date(Date.now())
        }
    })
}

async function deleteStory(id){
    return prisma.stories.delete({
        where: {
            id: Number(id)
        }
    })
}

module.exports = {
    getAllStories,
    getStoryById,
    getAllPostedStories,
    getPostedStoryById,
    createStory,
    deleteStoryByStatus,
    updateStory,
    deleteStory
}