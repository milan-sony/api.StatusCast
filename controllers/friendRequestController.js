import FriendRequest from '../model/friendRequestModel.js'
import User from '../model/userModel.js'

export const sendFriendRequest = async (req, res) => {
    try {
        const from = req.user?._id
        const { to } = req.body

        if (from === to) {
            return res.status(400).json(
                {
                    status: 400,
                    message: "You can't send a request to yourself"
                }
            )
        }

        const existing = await FriendRequest.findOne({ from, to })
        if (existing) {
            return res.status(400).json(
                {
                    status: 400,
                    message: "Friend request already sent"
                }
            )
        }

        const alreadyFriends = await User.findOne({ _id: from, friends: to })
        if (alreadyFriends) {
            return res.status(400).json(
                {
                    status: 400,
                    message: "Already friends"
                }
            )
        }

        const request = await FriendRequest.create({ from, to })
        res.status(200).json(
            {
                status: 200,
                message: "Friend request sent",
                data: request
            }
        )

    } catch (error) {
        console.error("Send Friend Request Error:", error)
        res.status(500).json(
            {
                status: 500,
                message: "Something went wrong",
                error
            }
        )
    }
}

// received requests
export const getReceivedRequests = async (req, res) => {
    try {
        const response = await FriendRequest.find(
            {
                to: req.user._id,
                status: 'pending'
            }
        ).populate('from', 'userName firstName lastName email')
        res.status(200).json(
            {
                status: 200,
                message: response
            }
        )
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch requests", error })
    }
}

// sent requests
export const getSentRequests = async (req, res) => {
    try {
        const response = await FriendRequest.find(
            {
                from: req.user?._id,
                status: 'pending'
            }
        ).populate('to', 'userName firstName lastName email')
        res.status(200).json({
            status: 200,
            message: response
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch requests", error })
    }
}

// accept/reject requests
export const respondToFriendRequest = async (req, res) => {
    try {
        const to = req.user?._id // Logged-in user
        const { from, action } = req.body // action = 'accept' or 'reject'

        console.log("from:", from, "action: ", action, "to: ", to)

        const friendRequest = await FriendRequest.findOne({ from, to, status: "pending" })

        if (!friendRequest) {
            return res.status(404).json({ message: "No pending friend request found" })
        }

        if (action === 'accept') {
            // Update request status
            friendRequest.status = "accepted"
            await friendRequest.save()

            // Add each other to friends list
            await User.findByIdAndUpdate(to, { $addToSet: { friends: from } })
            await User.findByIdAndUpdate(from, { $addToSet: { friends: to } })

            return res.status(200).json({ message: "Friend request accepted" })
        }

        if (action === 'reject') {
            // Delete status
            await FriendRequest.findByIdAndDelete(friendRequest._id)
            return res.status(200).json({ message: "Friend request rejected" })
        }

        return res.status(400).json({ message: "Invalid action." })

    } catch (error) {
        console.error("respondToFriendRequest error:", error)
        res.status(500).json({ message: "Something went wrong", error })
    }
} 