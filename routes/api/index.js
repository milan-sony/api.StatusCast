import express from "express"
import authRoutes from "./auth.js"

const router = express.Router()

const api = router.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "StatusCast API V1"
    })
})

// auth routes
router.use("/auth", authRoutes)

export default api