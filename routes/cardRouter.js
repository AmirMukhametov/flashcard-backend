const { Router } = require('express');
const cardController = require('../controllers/cardController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router();


router.post('/card', authMiddleware, cardController.addCard)


module.exports = router