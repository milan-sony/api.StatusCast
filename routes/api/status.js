import express from "express"
import { setStatus, getStatus, deleteStatus, getFriendsStatuses } from "../../controllers/statusController.js"
import { verifyToken } from "../../middleware/verifyToken.js"


const statusRoutes = express.Router()

// set status
statusRoutes.post("/set-status", verifyToken, setStatus)

// get status
statusRoutes.get("/get-status", verifyToken, getStatus)

// delete status
statusRoutes.delete("/delete-status", verifyToken, deleteStatus)

// get friends status
statusRoutes.get("/get-friends-status", verifyToken, getFriendsStatuses)

export default statusRoutes