import express from 'express'; 
import cors from 'cors';
const app = express()
import authRouter from "./routes/auth.js"
import 'dotenv/config'
import connectToDatabase from './config/database.js';

connectToDatabase()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)

app.listen(
    process.env.PORT,
    ()=> console.log(`Backend is running on port:${process.env.PORT}`)
)