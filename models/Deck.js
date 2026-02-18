const {Schema, model} = require('mongoose')

const Deck = Schema({
    title: {type: String, unique: true, required: true},
    collectionId: {type: Schema.Types.ObjectId, ref: 'Collection'},
})

module.exports = model('Deck', Deck)