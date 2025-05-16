import express from "express"
import authRoutes from "./auth.js"
import userRoutes from "./user.js"

const router = express.Router()

const api = router.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "StatusCast API V1"
    })
})

// auth routes
router.use("/auth", authRoutes)

// user routes
router.use("/user", userRoutes)

export default api