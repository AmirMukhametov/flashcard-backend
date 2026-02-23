const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: 'Не авторизован' })
    }
    try {
        console.log('SECRET_KEY from env:', process.env.SECRET_KEY);
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch(err) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
}

module.exports = authMiddleware