const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const sharp = require('sharp')
const fs = require('fs')

function generateUniqueFileName(originalName){
    const ext = path.extname(originalName)
    const randomString = crypto.randomBytes(6).toString('hex')
    const timestamp = Date.now()

    return `${timestamp}-${randomString}${ext}`
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, generateUniqueFileName(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(allowedTypes.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Only JPEG, JPG and PNG images are allowed'), false)
}

const upload = multer({
    storage,
    fileFilter
})

async function removeExifMiddleware(req, res, next) {
    if (!req.files || req.files.length === 0) {
        return next()
    }

    try {
        await Promise.all(
        req.files.map(async (file) => {
            const filePath = path.join(file.destination, file.filename)
            const tempPath = filePath + '.tmp' // file sementara

            // tulis versi clean tanpa EXIF ke file sementara
            await sharp(filePath)
            .toFile(tempPath)

            // replace file lama dengan file baru
            fs.renameSync(tempPath, filePath)
        })
        )
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    upload,
    removeExifMiddleware
}