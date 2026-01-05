import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string

if (!MONGO_URI){

    throw new Error("MONGO_URI is not defined in .env file")
}

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.on('open', () => console.log('Mongo connection is opened!'))
mongoose.connection.on('error', (error) => console.log('Connection faild', error.message))
mongoose.set('useCreateIndex', true)