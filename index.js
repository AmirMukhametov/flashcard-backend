const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const cardRouter = require('./routes/cardRouter')
const cors = require('cors');
require('dotenv').config();


const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use("/auth", authRouter)
app.use("/card", cardRouter)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

const start =  () => {

        app.listen(PORT, async() => {
            try {
                await mongoose.connect(process.env.MONGODB_URI)
                console.log(`server started on ${PORT}`)
                console.log(`MongoDB connected: ${mongoose.connection.host}`)
            } catch (err) {
                console.log(err)

            }
           
    }) 
}

start()