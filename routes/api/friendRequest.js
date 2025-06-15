import express from 'express'
import { sendFriendRequest } from '../../controllers/friendRequestController.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const friendRequestRoutes = express.Router()

friendRequestRoutes.post('/send', verifyToken, sendFriendRequest)

export default friendRequestRoutes
