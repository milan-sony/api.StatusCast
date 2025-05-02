import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js"
import jwt from 'jsonwebtoken'

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
        console.error("Error signingup the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error signingup the user",
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
            message: "Error logingin the user",
            error: error
        })
    }
}

// generate access token with refresh token
// export const refresh = (req, res) => {

//     try {
//         const token = req.cookies.refreshToken

//         console.log("RefreshToken: ", token)

//         // check if token exists
//         if (!token) {
//             console.error("Unauthorized user - refresh token not found")
//             return res.status(401).json({
//                 status: 401,
//                 message: "Unauthorized user - refresh token not found"
//             })
//         }

//         // verify refresh token
//         try {
//             const { userId } = jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN)
//             const newAccessToken = generateAccessToken(userId)
//             return res.status(200).json({
//                 status: 200,
//                 message: "New accessToken generated",
//                 token: newAccessToken
//             })
//         } catch (error) {
//             return res.status(403).json({
//                 status: 403,
//                 message: "Invalid or expired refresh token",
//                 error: error
//             })
//         }

//     } catch (error) {
//         console.log("Error generating the refresh token, ", error)
//         return res.status(500).json({
//             status: 500,
//             message: "Error generating the refresh token",
//             error: error
//         })
//     }

// }


export const refresh = (req, res) => {
    console.log("req: ", req.cookies)

    const token = req.cookies.refreshToken

    console.log("Refresh Token: ", token)

    if (!token) {
        return res.status(401).json({ message: 'No refresh token' })
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_REFRESH_TOKEN)
        const newAccessToken = generateAccessToken(userId)
        return res.status(200).json({ accessToken: newAccessToken })
    } catch (err) {
        console.error("Refresh token error:", err)
        return res.status(403).json({ message: 'Invalid or expired refresh token' })
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

export const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/auth/logout',
        })
        return res.status(200).json({
            status: 200,
            message: "User logout successfully"
        })
    } catch (error) {
        console.error("Error logging out the user, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error in logout the user",
            error: error
        })
    }
}