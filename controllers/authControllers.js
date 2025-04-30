import User from "../model/userModel.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {

    // {
    //     "userName" : "3i74n",
    //     "firstName" : "Milan",
    //     "lastName" : "Sony",
    //     "email" : "milan@gmail.com",
    //     "password" : "1234567890"
    //   }

    try {

        const { userName, firstName, lastName, email, password } = req.body

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

        // check password length
        if (password.length < 6) {
            return res.status(400).json({
                status: 400,
                message: "Password must be atleast 6 character"
            })
        }

        // check if the user already exists or not
        const existingUser = await User.findOne({ userName: userName })

        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: "User with this email already exist's"
            })
        }

        // hashing/salting the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        // creating the new user object
        const newUser = new User({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            // save new user to DB
            newUser.save()
            return res.status(201).json({
                status: 201,
                message: "Account successfully created",
                data: newUser
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Something went wrong account not created"
            })
        }

    } catch (error) {
        console.error("Error signingup the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error signingup the user"
        })
    }
}