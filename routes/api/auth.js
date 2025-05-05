import express from "express"
import { signup, login, refresh, logout, profile, checkAuth } from "../../controllers/authControllers.js"
import { verifyToken } from "../../middleware/verifyToken.js"

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

// check auth
authRoutes.post("/check", verifyToken, checkAuth)


export default authRoutes