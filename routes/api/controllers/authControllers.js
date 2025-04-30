export const signup = async (req, res) => {
    try {

        const { userName, firstName, lastName, email, password } = req.body

        console.log(req.body)

        // check empty input fields
        if (!userName) {
            return res.status(400).json({
                status: 400,
                message: "UserName is required"
            })
        }
        if (!firstName) {
            return res.status(400).json({
                status: 400,
                message: "FirstName is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                status: 400,
                message: "Email is required"
            })
        }
        if (!password) {
            return res.status(400).json({
                status: 400,
                message: "Password is required"
            })
        }

        console.log(userName, firstName, lastName, email, password)

    } catch (error) {
        console.error("Error signing up the user, ", error)
    }
}