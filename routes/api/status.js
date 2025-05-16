import express from "express"
import { setStatus, getStatus } from "../../controllers/statusController.js"
import { verifyToken } from "../../middleware/verifyToken.js"


const statusRoutes = express.Router()

// set status
statusRoutes.post("/set-status", verifyToken, setStatus)

// get status
statusRoutes.get("/get-status/:id", verifyToken, getStatus)

export default statusRoutes