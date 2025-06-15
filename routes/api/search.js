import express from "express"
import { verifyToken } from "../../middleware/verifyToken.js"
import { searchProfile } from "../../controllers/searchControllers.js"

const searchRoutes = express.Router()

// search profile
searchRoutes.post("/search-profile", verifyToken, searchProfile)

export default searchRoutes