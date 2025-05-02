import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`\n🔗 Connection established with MongoDB Atlas @ ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error establishing connection with MongoDB Atlas: ${error.message}`)
    }
}

export default connectDB