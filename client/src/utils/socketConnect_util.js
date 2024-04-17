
import { addOrUpdateLocalStorageKey } from "./localStorage_util";
import { stripJWT } from "./stripJWT_util";
import { io } from "socket.io-client";

export async function socketConnect_util (tempAKey, response){

    // use tempKey Connect to Websocket
    return new Promise((resolve, reject) => {
        
        const socket = io.connect(
            `http://localhost:5555/friends-socket?token=${tempAKey}`,{
                // transportOptions: {
                //     transport: ['websocket'],
                //     withCredentials: true,
                // },
                // websocket: {
                //     Authorization: `Bearer ${tempAKey}`,
                // }
            }
        )

        // socket.on('connect', () => {
        //     resolve(socket); // Resolve the Promise with the socket instance
        // });

        socket.on('connection_status', (data)=>{
            console.log(data.aKey)

            // Update Local Storage
            // DATA NEEDS TO BE UPDATED ON BACKEND
            // TO HOLD THE NEW TOKEN IN HEADER
            addOrUpdateLocalStorageKey('aKey', 
                stripJWT(data.headers.get('Authorization'))
            )

            // If connection is successful resolve promise
            resolve(socket)
        })

        // If connection is unsuccessful raise an error
        // and prompt user to login again

        socket.on('connect_error', (error) => {
            reject(error)
        })
        
    })

}