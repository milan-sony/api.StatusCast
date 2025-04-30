import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import routes from "./routes/index.js"

// Config .env
dotenv.config()

// creates an express app
const app = express()

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// base URL
app.use("/", routes)

app.listen((process.env.PORT || 5000), () => {
    console.log(`\n🚀 Server listening on port: ${process.env.PORT || 5000}`)
})