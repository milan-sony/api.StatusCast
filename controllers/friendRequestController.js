import FriendRequest from '../model/friendRequestModel.js'
import User from '../model/userModel.js'

export const sendFriendRequest = async (req, res) => {
    try {
        const from = req.user?._id

        console.log("from: ", from)

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

// Accept/Reject Friend Request
export const respondToFriendRequest = async (req, res) => {
    try {
        const { requestId, action } = req.body
        const request = await FriendRequest.findById(requestId)

        if (!request || request.to.toString() !== req.user._id) {
            return res.status(404).json({ message: "Request not found or unauthorized" })
        }

        if (!['accepted', 'rejected'].includes(action)) {
            return res.status(400).json({ message: "Invalid action" })
        }

        request.status = action
        await request.save()

        if (action === 'accepted') {
            await User.findByIdAndUpdate(request.from, { $push: { friends: request.to } })
            await User.findByIdAndUpdate(request.to, { $push: { friends: request.from } })
        }

        res.status(200).json({ message: `Friend request ${action}.` })

    } catch (error) {
        console.error("Respond Error:", error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}

