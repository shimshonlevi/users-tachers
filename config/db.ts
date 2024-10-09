import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI as string;

    if (!mongoUri) {
        console.error("Error: MONGO_URI is not defined in the environment variables");
        process.exit(1);
    }

    try {
        const connect = await mongoose.connect(mongoUri); 

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err instanceof Error ? err.message : err);
        process.exit(1);
    }
};

export default connectDB;
