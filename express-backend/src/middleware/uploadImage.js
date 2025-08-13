const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

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

module.exports = upload