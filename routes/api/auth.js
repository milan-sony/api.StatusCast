import express from "express"
import { signup, login, refresh, logout, profile } from "../../controllers/authControllers.js"
import { verifyToken } from "../../middleware/verifyToken.js"

const authRoutes = express.Router()

// user signup
authRoutes.post("/signup", signup)

// user login
authRoutes.post("/login", login)

// generate refresh token
authRoutes.get("/refresh", refresh)

// user logout
authRoutes.get("/logout", logout)

// user profile
authRoutes.post("/profile", verifyToken, profile)

export default authRoutes