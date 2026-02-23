const {Schema, model} = require('mongoose')

const Collection = Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Collection', Collection)