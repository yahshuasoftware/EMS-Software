import express from 'express'; 
import cors from 'cors';
const app = express()
import authRouter from "./routes/auth.js"
import * as dotenv from 'dotenv'
import connectToDatabase from './config/database.js';

dotenv.config()

connectToDatabase()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)

app.listen(
    process.env.PORT,
    ()=> console.log(`Backend is running on port:${process.env.PORT}`)
)