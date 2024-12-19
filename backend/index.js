import express from 'express'; 
import cors from 'cors';
const app = express()
import authRouter from "./routes/auth.js"
import departmentRouter from "./routes/department.js"
import employeeRouter from "./routes/employee.js"
import * as dotenv from 'dotenv'
import connectToDatabase from './config/database.js';

dotenv.config()

connectToDatabase()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)


app.listen(
    process.env.PORT,
    ()=> console.log(`Backend is running on port:${process.env.PORT}`)
)