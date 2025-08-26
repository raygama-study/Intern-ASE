const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const moderatorModel = require('../src/models/usersModel')
const categoryModel = require('../src/models/categoriesModel')
const bcrypt = require('bcrypt')

async function main(){
    const hashedPassword = await bcrypt.hash("user",10)
    await moderatorModel.createUser("user", "user", hashedPassword)
    await categoryModel.createCategory("rumbling")
    await categoryModel.createCategory("world war")
    await categoryModel.createCategory("civil war")
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })