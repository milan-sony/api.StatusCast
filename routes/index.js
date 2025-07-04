import expres from "express";
import api from "./api/index.js";

const router = expres.Router()

// API V1
router.use("/api/v1", api)

const routes = router.use("/api", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "API works properly"
    })
})

export default routes