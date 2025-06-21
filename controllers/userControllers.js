export const profile = (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            message: "Profile found",
            user: req.user
        })
    } catch (error) {
        console.error("Error in finding profile", error.message)
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error
        })
    }
}