const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const crypto = require('crypto')

async function getAllStoriesStatus(status){
    return prisma.stories.findMany({
        where: {
            status: status
        },
        include: {
            story_categories: {
                include: {
                    categories: true
                }
            },
            images: true,
            comments: true,
            profanes: true
        }
    })
}

async function getStoryByIdStatus(id, status){
    return prisma.stories.findFirst({
        where: {
            id: Number(id),
            status: status
        },
        include: {
            story_categories: {
                include: {
                    categories: true
                }
            },
            images: true,
            comments: true,
            profanes: true
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
            images: true,
            comments: true,
            profanes: true
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
            images: true,
            comments: true,
            profanes: true
        }
    })
}

async function getStoryByToken(token) {
    return prisma.stories.findFirst({
        where: {
            deletion_token: token
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

async function createStory(content, status, categoryIds, isFlagged){
    const deletionToken = crypto.randomBytes(8).toString('hex')
    return prisma.stories.create({
        data: {
            content,
            status,
            isFlagged,
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
    getAllStoriesStatus,
    getStoryByIdStatus,
    getStoryByToken,
    createStory,
    deleteStoryByStatus,
    updateStory,
    deleteStory
}