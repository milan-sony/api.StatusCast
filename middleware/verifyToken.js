import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        })
    }

    // split the bearer token "bearer efhjkhfjkhjkhsjkhsjkhjgkhkjsh"

    const bearer = token.split(' ');
    const bearerToken = bearer[1];

    try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_ACCESS_TOKEN);
        console.log("decoded", decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Invalid token"
        })
    }
}