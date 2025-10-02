const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function getComments(status) {
    return prisma.comments.findMany({
        where: {
            status: status
        }
    })
}

async function getComment(status, id) {
    return prisma.comments.findFirst({
        where: {
            status: status,
            id: Number(id)
        }
    })
}

async function getCommentsByStory(status, idStory) {
    return prisma.comments.findMany({
        where: {
            id_story: Number(idStory),
            status: status
        }
    })
}

async function createComment(content, id_story, status) {
    return prisma.comments.create({
        data: {
            content,
            id_story: Number(id_story),
            status
        }
    })
}

module.exports = {
    getComments,
    getComment,
    getCommentsByStory,
    createComment
}