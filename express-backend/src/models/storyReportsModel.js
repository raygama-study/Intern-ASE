const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllStoryReports(){
    return prisma.story_reports.findMany({
        include: {
            stories: true
        }
    })
}

async function getStoryReportById(id){
    return prisma.story_reports.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            stories: {
                include: {
                    images: true
                }
            }
        }
    })
}

async function createStoryReport(idStory, reason, isReportedByAI){
    return prisma.story_reports.create({
        data: {
            id_story: idStory,
            reason: reason,
            is_reported_by_ai: isReportedByAI,

        },
        include: {
            stories: true
        }
    })
}

async function updateStoryReport(idStory, idModerator, isApproved){
    return prisma.story_reports.update({
        where: {
            id: Number(id),
        },
        data: {
            id_story: idStory,
            id_moderator: idModerator,
            is_approved: isApproved
        }
    })
}

module.exports = {
    getAllStoryReports,
    getStoryReportById,
    createStoryReport,
    updateStoryReport
}