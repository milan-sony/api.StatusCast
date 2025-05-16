import express from "express"
import { profile } from "../../controllers/userControllers.js"
import { verifyToken } from "../../middleware/verifyToken.js"

const userRoutes = express.Router()

// user profile
userRoutes.post("/profile", verifyToken, profile)

export default userRoutes