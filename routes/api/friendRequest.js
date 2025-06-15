import express from 'express'
import { getReceivedRequests, getSentRequests, sendFriendRequest } from '../../controllers/friendRequestController.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const friendRequestRoutes = express.Router()

friendRequestRoutes.post('/send', verifyToken, sendFriendRequest)
friendRequestRoutes.get("/received-requests", verifyToken, getReceivedRequests)
friendRequestRoutes.get("/sent-requests", verifyToken, getSentRequests)


export default friendRequestRoutes