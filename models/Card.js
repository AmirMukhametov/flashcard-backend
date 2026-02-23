const {Schema, model} = require('mongoose');

const Card = Schema({
    front: {type: String, unique: false, required: true},
    back: {type: String, unique: false, required: true},
    deckId: {type: Schema.Types.ObjectId, ref: "Deck"}
})

module.exports = model('Card', Card)