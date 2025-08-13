const {PrismaClient} = require('../generated/prisma')
const prisma = new PrismaClient()

async function saveImage(storyId, fileName){
    return prisma.images.create({
        data: {
            id_story: storyId,
            name: fileName
        }
    })
}

module.exports = {
    saveImage
}