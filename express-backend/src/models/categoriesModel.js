const {PrismaClient} = require('../generated/prisma')
const prisma = new PrismaClient();

//get all categories
async function getAllCategories(){
    return prisma.categories.findMany()
}

//get category by id
async function getCategoryById(id){
    return prisma.categories.findFirst({
        where: {
            id: Number(id)
        }
    })
}

//create category
async function createCategory(name){
    return prisma.categories.create({
        data: {
            name
        }
    })
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
}