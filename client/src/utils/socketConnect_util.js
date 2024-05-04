
import { addOrUpdateLocalStorageKey } from "./localStorage_util";
import { io } from "socket.io-client";

export async function socketConnect_util (tempAKey){

    return new Promise((resolve, reject) => {

        const socket = io.connect(
            `http://localhost:5555/friends-socket?token=${tempAKey}`
        )

        socket.on('connection_status', (data)=>{
            // Update Local Storage
            console.log('test')
            addOrUpdateLocalStorageKey('aKey', data.aKey)
            // Return Socket Instance
            resolve(socket)
        })

        // Auth Error from Backend
        socket.on('connect_error', (error) => {
            console.log('errortest')
            reject(error)
        })
    })
}