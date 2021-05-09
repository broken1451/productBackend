import dotenv from "dotenv";
import { db } from "./src/db/db";
import Server from "./src/server/server";
dotenv.config();



const server = new Server();

const conn = async () => {
    try {
     await db()
     await server.start(Number(process.env.PORT)); 
    } catch (error) {
        console.log(error)
    }
 }
 
conn();
