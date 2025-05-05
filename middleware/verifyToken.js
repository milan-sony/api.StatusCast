import jwt from "jsonwebtoken"
import User from "../model/userModel.js"

export const verifyToken = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1] // Split the bearer token "bearer efhjkhfjkhjkhsjkhsjkhjgkhkjsh"

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN)

        const user = User.findOne({ _id: decoded.userId }).select("-password -__v")

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "User not found"
            })
        }

        req.user = user

        next()
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Invalid token"
        })
    }
}