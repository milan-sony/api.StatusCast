import express from "express"
import { signup, login, refresh, logout } from "../../controllers/authControllers.js"

const authRoutes = express.Router()

// user signup
authRoutes.post("/signup", signup)

// user login
authRoutes.post("/login", login)

// generate refresh token
authRoutes.post("/refresh", refresh)

// user logout
authRoutes.post("/logout", logout)


export default authRoutes