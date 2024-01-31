
import { io } from "socket.io-client";

export async function socketConnect_util (tempAKey){

    // Update Local Storage
    // await addOrUpdateLocalStorageKey('aKey', 
    //     stripJWT(response.headers.get('Authorization'))
    // )

            // use tempKey Connect to Websocket
            return new Promise((resolve, reject) => {
                
                const socket = io.connect(
                    'http://localhost:5555/friends-socket',{
                        transport: ['websocket'],
                        Authorization: `Bearer ${tempAKey}`,
                        withCredentials: true,
                    }
                )   
                
                // If connection is successful resolve promise

                socket.on('connect', () => {
                    resolve(socket); // Resolve the Promise with the socket instance
                });

                // If connection is unsuccessful raise an error
                // and prompt user to login again

                socket.on('connect_error', (error) => {
                    reject(error)
                })
                
            })

}