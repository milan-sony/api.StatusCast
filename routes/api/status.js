import express from "express"
import { setStatus } from "../../controllers/statusController.js"


const statusRoutes = express.Router()

// user signup
statusRoutes.post("/set-status", setStatus)

export default statusRoutes