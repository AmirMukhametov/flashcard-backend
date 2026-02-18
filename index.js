const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use("/auth", authRouter)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`server started on ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()