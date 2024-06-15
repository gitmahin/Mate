import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function connDb(): Promise<void> {
    if(connection.isConnected){
        console.log("Database already connected")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnected = db.connections[0].readyState
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection failed")
        process.exit()
    }
}

export default connDb