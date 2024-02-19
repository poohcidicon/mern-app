import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.mongodb).then(() => {
        console.log('Connected to DB')
    })
    .catch(err => {
        throw(err)
    })
}

app.use("/api/users", userRoutes)

app.listen(8080, () => {
    connect()
    console.log('Connected')
})