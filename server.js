import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import routes from "./routes/index.js"
import connectDB from "./config/db.js"
import cookieParser from 'cookie-parser'
import cors from "cors"

// Config .env
dotenv.config()

// creates an express app
const app = express()

// connect DB
connectDB()

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// cors
app.use(cors({
    origin: process.env.REACT_URL,
    credentials: true //allows to send cookies and authorization headers with the request
}))

// config cookie parser
app.use(cookieParser())

// base URL
app.use("/", routes)

app.listen((process.env.PORT || 5000), () => {
    console.log(`\n🚀 Server listening on port: ${process.env.PORT || 5000}`)
})