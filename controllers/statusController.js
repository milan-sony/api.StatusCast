import Status from "../model/statusModel.js";

// set status
export const setStatus = async (req, res) => {
    try {
        const { userId, emoji, status, startTime, endTime } = req.body
        // check for empty inputs
        if (!status) {
            return res.status(400).json({
                status: 400,
                message: "Status is required"
            })
        }
        if (!startTime) {
            return res.status(400).json({
                status: 400,
                message: "Start time is required"
            })
        }
        if (!endTime) {
            return res.status(400).json({
                status: 400,
                message: "End time is required"
            })
        }

        const newStatus = new Status({
            userId: userId,
            emoji: emoji,
            status: status,
            startTime: startTime,
            endTime: endTime
        })

        if (newStatus) {
            await newStatus.save()
            return res.status(201).json({
                status: 201,
                message: "Status Saved successfully",
                data: newStatus
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Something went wrong status not saved"
            })
        }

    } catch (error) {
        console.error("Error saving the status, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error saving the status",
            error: error
        })
    }
}