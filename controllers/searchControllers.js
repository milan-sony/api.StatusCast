import User from "../model/userModel.js"

export const searchProfile = async (req, res) => {
    try {
        const { searchName } = req.body

        if (!searchName) {
            return res.status(400).json(
                {
                    status: 400,
                    message: "Search term is required."
                }
            )
        }

        const regex = new RegExp(searchName, 'i')

        const results = await User.find({
            $or: [
                { userName: regex },
                { firstName: regex },
                { email: regex }
            ]
        })

        res.status(200).json(
            {
                status: 200,
                message: results
            })
    } catch (error) {
        console.error("search profile error:", error)
        res.status(500).json(
            {
                status: 500,
                message: "Something went wrong while searching.",
                error: error
            })
    }
}
