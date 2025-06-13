import express from "express"
import { setStatus, getStatus, deleteStatus } from "../../controllers/statusController.js"
import { verifyToken } from "../../middleware/verifyToken.js"


const statusRoutes = express.Router()

// set status
statusRoutes.post("/set-status", verifyToken, setStatus)

// get status
statusRoutes.get("/get-status/:id", verifyToken, getStatus)

// delete status
statusRoutes.delete("/delete-status/:id", verifyToken, deleteStatus)

export default statusRoutes