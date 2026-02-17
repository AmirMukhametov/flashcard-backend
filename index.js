const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
require('dotenv').config();


const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`server started on ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()