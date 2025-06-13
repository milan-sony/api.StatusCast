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

        // check if the user already set status
        const existingStatus = await Status.findOne({ userId: userId })

        if (existingStatus) {
            return res.status(400).json({
                status: 400,
                message: "You have already set one status"
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
                message: "Status set successfully",
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

// get status
export const getStatus = async (req, res) => {

    try {
        const userId = req.params.id

        const status = await Status.findOne({ userId: userId }).select("-__v")

        return res.status(200).json({
            status: 200,
            message: status
        })
    } catch (error) {
        console.error("Error getting the user status, ", error)
        return res.status(500).json({
            status: 500,
            message: "Error getting the user status",
            error: error
        })
    }
}

// delete status
export const deleteStatus = async (req, res) => {
    try {
        const userId = req.params.id

        const status = await Status.deleteOne({ userId: userId }).select("-__v")

        return res.status(201).json({
            status: 201,
            message: "Status deleted successfully",
            data: status
        })

    } catch (error) {
        console.error("Error deleting the user status, ", error)

        return res.status(500).json({
            status: 500,
            message: "Error deleting the user status",
            error: error
        })
    }
}

// get all user status
export const getAllUsersStatus = async (req, res) => {
    try {
        const allUsersStatus = await Status.find()
            .populate('userId', 'firstName lastName -_id') // Get firstName & lastName from User, exclude _id
            .select('-__v');

        return res.status(200).json({
            status: 200,
            message: allUsersStatus
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error getting all user status",
            error: error.message
        });
    }
};

