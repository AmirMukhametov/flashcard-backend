const { Router } = require('express');
const cardController = require('./cardController')
const authMiddleware = require('./middleware/authMiddleware')

const router = Router();


router.post('/card', authMiddleware, cardController.addCard)


module.exports = router