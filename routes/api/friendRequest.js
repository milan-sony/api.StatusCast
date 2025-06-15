import express from 'express'
import { sendFriendRequest, respondToFriendRequest } from '../../controllers/friendRequestController.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const friendRequestRoutes = express.Router()

friendRequestRoutes.post('/send', verifyToken, sendFriendRequest)
friendRequestRoutes.post('/respond', verifyToken, respondToFriendRequest)

export default friendRequestRoutes
