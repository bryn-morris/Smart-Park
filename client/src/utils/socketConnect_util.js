
import { addOrUpdateLocalStorageKey } from "./localStorage_util";
import { io } from "socket.io-client";

export async function socketConnect_util (tempAKey){

    return new Promise((resolve, reject) => {
        
        const socket = io.connect(
            `http://localhost:5555/friends-socket?token=${tempAKey}`
        )

        socket.on('connection_status', (data)=>{

            // Update Local Storage
            addOrUpdateLocalStorageKey('aKey', data.aKey)

            // If connection is successful resolve promise
            // and return socket instance
            resolve(socket)
        })

        // If connection is unsuccessful raise an error
        // and prompt user to login again
        socket.on('connect_error', (error) => {
            reject(error)
        })
        
    })

}