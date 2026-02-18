const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    console.log('SECRET_KEY used for signing:', process.env.SECRET_KEY);
    return jwt.sign(payload, process.env.SECRET_KEY , {expiresIn: "24h"})
}


class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации"})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPasssword = bcrypt.hashSync(password, 7) 
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPasssword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегестрирован'})
        } catch(err) {
            console.log(err)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch(err) {
            console.log(err)
            res.status(400).json({message: "Login error"})
        }
        
    }

    async getUsers (req, res) {
        console.log('➡️ getUsers controller called');
        try {
            const users = await User.find()
            res.json(users)
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = new authController()