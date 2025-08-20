const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const moderatorModel = require('../src/models/usersModel')
const bcrypt = require('bcrypt')

async function main(){
    const hashedPassword = await bcrypt.hash("user",10)
    const user = await moderatorModel.createUser("user", "user", hashedPassword)
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async() => {
        await prisma.$disconnect()
    })