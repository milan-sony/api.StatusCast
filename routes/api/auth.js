import express from "express"
import { signup, login } from "../../controllers/authControllers.js"

const authRoutes = express.Router()

// signup
authRoutes.post("/signup", signup)

authRoutes.post("/login", login)

export default authRoutes