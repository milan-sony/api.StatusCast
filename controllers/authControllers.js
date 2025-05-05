import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js"
import jwt from 'jsonwebtoken'

// user signup
export const signup = async (req, res) => {

    // {
    //     "firstName" : "Milan",
    //     "lastName" : "Sony",
    //     "email" : "milan@gmail.com",
    //     "password" : "1234567890"
    //   }

    try {
        const { firstName, lastName, email, password } = req.body

        // check empty input fields
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
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

        if (newUser) {
            // save new user to DB
            await newUser.save()
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
        console.error("Error signing up the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error signing up the user",
            error: error
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

        const userData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        return res.status(200).json({
            status: 200,
            message: "You have successfully logged in",
            data: userData,
            token: accessToken
        })

    } catch (error) {
        console.error("Error logging in the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error logging in the user",
            error: error
        })
    }
}

// generate refresh token when access token expires
export const refresh = (req, res) => {

    const token = req.cookies.refreshToken

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'No refresh token'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN)

        const userId = decoded.userId

        const newAccessToken = generateAccessToken(userId)

        return res.status(200).json({ accessToken: newAccessToken })
    } catch (err) {
        console.error("Refresh token error:", err)

        return res.status(403).json({ message: 'Invalid or expired refresh token' })
    }
}

export const checkAuth = (req, res) => {
    try {
        console.log("Checkauth req.user", req.user)
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        console.log("Error in checkAuth", error.message)
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: error
        })
    }
}

export const profile = (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "No token found"
            })
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN)
        return res.status(200).json({
            status: 200,
            userId: userId
        })

    } catch (error) {
        console.error("Error getting the profile, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error getting the profile",
            error: error
        })
    }
}

// user logout
export const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
        })
        return res.status(200).json({
            status: 200,
            message: "You have successfully logged out"
        })
    } catch (error) {
        console.error("Error logging out the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error logging out the user",
            error: error
        })
    }
}