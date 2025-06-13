import express from "express"
import { setStatus, getStatus, deleteStatus, getAllUsersStatus } from "../../controllers/statusController.js"
import { verifyToken } from "../../middleware/verifyToken.js"


const statusRoutes = express.Router()

// set status
statusRoutes.post("/set-status", verifyToken, setStatus)

// get status
statusRoutes.get("/get-status", verifyToken, getStatus)

// delete status
statusRoutes.delete("/delete-status", verifyToken, deleteStatus)

// get all status
statusRoutes.get("/get-all-status", verifyToken, getAllUsersStatus)

export default statusRoutes