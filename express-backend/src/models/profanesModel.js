const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

//create profane
async function createProfane(categories = [], idStory) {
    return prisma.profanes.createMany({
        data: categories.map(cat => ({
            category: cat.trim(),
            id_story: idStory
        }))
    })
}

//get profane by story
async function getProfanesbyStory(idStory) {
    return prisma.profanes.findMany({
        where: {
            id_story: idStory
        }
    })
}

//delete profane
async function deleteProfane(id){
    return prisma.profanes.deleteMany({
        where: {
            id:Number(id)
        }
    })
}

module.exports = {
    createProfane,
    deleteProfane
}