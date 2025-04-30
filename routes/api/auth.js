import express from "express"
import { signup } from "../../controllers/authControllers.js"

const authRoutes = express.Router()

// signup
authRoutes.post("/signup", signup)

export default authRoutes