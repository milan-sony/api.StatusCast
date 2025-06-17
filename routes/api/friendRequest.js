import express from 'express'
import { cancelFriendRequest, getReceivedRequests, getSentRequests, respondToFriendRequest, sendFriendRequest } from '../../controllers/friendRequestController.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const friendRequestRoutes = express.Router()

friendRequestRoutes.post('/send', verifyToken, sendFriendRequest)
friendRequestRoutes.get("/received-requests", verifyToken, getReceivedRequests)
friendRequestRoutes.get("/sent-requests", verifyToken, getSentRequests)
friendRequestRoutes.post("/respond-requests", verifyToken, respondToFriendRequest)
friendRequestRoutes.post("/cancel-requests", verifyToken, cancelFriendRequest)


export default friendRequestRoutes