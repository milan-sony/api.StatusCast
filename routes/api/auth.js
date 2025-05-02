import express from "express"
import { signup, login, refresh, logout, profile } from "../../controllers/authControllers.js"

const authRoutes = express.Router()

// user signup
authRoutes.post("/signup", signup)

// user login
authRoutes.post("/login", login)

// generate refresh token
authRoutes.post("/refresh", refresh)

// user logout
authRoutes.post("/logout", logout)

// user profile
authRoutes.post("/profile", profile)


export default authRoutes