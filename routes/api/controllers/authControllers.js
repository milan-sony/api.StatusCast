export const signup = async (req, res) => {
    try {

        const { userName, firstName, lastName, email, password } = req.body

        // check empty input fields
        if (!userName) {
            return res.status(400).json({
                status: 400,
                message: "UserName field is required"
            })
        }
        if (!firstName) {
            return res.status(400).json({
                status: 400,
                message: "FirstName field is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Email field is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: 400,
                message: "Password field is required"
            })
        }

        

    } catch (error) {

    }
}