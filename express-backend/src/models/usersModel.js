const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser(name, username, password){
    return prisma.moderators.create({
        data:{
            name, username, password
        }
    })
}

async function findByUsername(username){
    return prisma.moderators.findUnique({
        where: {username}
    })
}

module.exports = {
    createUser,
    findByUsername
}