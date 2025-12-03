import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js'
import projectRouter from './routes/projectRoute.js'

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))
app.use((cookieParser()))
app.use('/api/user', userRouter)
app.use('/api/project', projectRouter)


connectDB().then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000..!')
    })
})