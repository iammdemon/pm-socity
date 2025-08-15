import { Server } from "http";
import config from "./app/config";
import mongoose from "mongoose";
import app from "./app";


let server: Server;

async function startServer() {
    try{
        await mongoose.connect(config.database_url as string)
        server = app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        })
    }
    catch (error) {
        console.error("Failed to connect to the database", error);
     
    }
}
startServer();