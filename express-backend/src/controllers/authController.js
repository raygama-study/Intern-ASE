const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/usersModel')
const response = require('../helpers/response')

async function register(req, res){
    try{
        const {name, username, password} = req.body

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.createUser(name, username, hashedPassword)

        response(201, user, `User registered`, res)
    } catch(error){
        response(500, null, `failed to register moderator: ${error.message}`, res)
    }
}

async function login(req, res){
    try{
        const {username, password} = req.body

        const user = await userModel.findByUsername(username)
        if(!user){
            return response(401, null, `invalid username or password`, res)
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return response(401, null, `invalid username or password`, res)
        }

        const token = jwt.sign(
            {
            id: user.id,
            username: user.username
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        const data = {
            user:{
                id: user.id,
                username: user.username,
                name: user.name
            },
            token: token
        }

        response(200, data, `login succesful`, res)
    } catch(error){
        response(500, null, `failed to login: ${error.message}`, res)
    }
}

module.exports = {
    register,
    login
}