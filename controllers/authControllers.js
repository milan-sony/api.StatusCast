import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js"

// user signup
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
        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: "User with this email already exists!"
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

// user login
export const login = async (req, res) => {

    // {
    //     "email" : "milan@gmail.com",
    //     "password" : "1234567890"
    //   }

    try {
        const { email, password } = req.body

        // check user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            })
        }

        // check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            })
        }

        const accessToken = generateAccessToken(user._id)
        generateRefreshToken(user._id, res)

        return res.status(200).json({
            status: 200,
            message: "Login succesfull",
            data: user,
            token: accessToken
        })

    } catch (error) {
        console.error("Error loging the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error logingin the user"
        })
    }
}