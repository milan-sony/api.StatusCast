import User from "../model/userModel.js"
import FriendRequest from "../model/friendRequestModel.js"

export const searchProfile = async (req, res) => {
    try {
        const { searchName } = req.body
        const currentUserId = req.user.id

        if (!searchName) {
            return res.status(400).json({ message: "Search term is required." })
        }

        const regex = new RegExp(searchName, "i")

        // Find matching users (excluding self)
        const users = await User.find({
            $and: [
                {
                    $or: [
                        { userName: regex },
                        { firstName: regex },
                        { email: regex }
                    ]
                },
                { _id: { $ne: currentUserId } }
            ]
        }).select("_id userName firstName lastName email friends")

        // Find sent friend requests from current user
        const sentRequests = await FriendRequest.find({ from: currentUserId, status: "pending" }).select("to")

        const sentMap = new Set(sentRequests.map(r => r.to.toString()))

        const currentUser = await User.findById(currentUserId).select("friends")

        const result = users.map(user => ({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isFriend: currentUser.friends.includes(user._id),
            requestSent: sentMap.has(user._id.toString())
        }))

        res.status(200).json({ status: 200, message: result })
    } catch (error) {
        console.error("Search profile error:", error)
        res.status(500).json({ message: "Something went wrong", error })
    }
}
