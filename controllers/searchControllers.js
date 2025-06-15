import User from "../model/userModel.js"

export const searchProfile = async (req, res) => {
    try {
        const { searchName } = req.body
        const currentUserId = req.user?._id

        if (!searchName) {
            return res.status(400).json({
                status: 400,
                message: "Search term is required."
            })
        }

        const regex = new RegExp(searchName, 'i')

        const results = await User.find({
            _id: { $ne: currentUserId }, // Exclude current user
            $or: [
                { userName: regex },
                { firstName: regex },
                { email: regex }
            ]
        }).select("-__v -password")

        return res.status(200).json({
            status: 200,
            message: results
        })

    } catch (error) {
        console.error("search profile error:", error)
        return res.status(500).json({
            status: 500,
            message: "Something went wrong while searching.",
            error: error.message || error
        })
    }
}
