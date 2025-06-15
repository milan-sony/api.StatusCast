import express from "express"
import authRoutes from "./auth.js"
import userRoutes from "./user.js"
import statusRoutes from "./status.js"
import searchRoutes from "./search.js"

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

// status route
router.use("/status", statusRoutes)

// search users
router.use("/search", searchRoutes)

export default api