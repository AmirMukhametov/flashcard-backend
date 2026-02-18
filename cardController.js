const Card = require('./models/Card')

class cardController {
    async addCard(req, res) {
        try {
            const {front, back, deckId} = req.body
            const userId = req.user.userId


            const card = new Card({ front, back, deckId})
            await card.save()

            res.status(201).json(card)

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new cardController();