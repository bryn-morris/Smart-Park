import { stripJWT } from "./stripJWT_util";
import { io } from "socket.io-client";

export async function socketConnect_util (response){

    // Update Local Storage
            // await addOrUpdateLocalStorageKey('aKey', 
            //     stripJWT(response.headers.get('Authorization'))
            // )

            // grab the temp key
            const tempAKey =  await stripJWT(response.headers.get('Authorization'))

            // use tempKey Connect to Websocket
            const friendSocketInstance = await new Promise((resolve, reject) => {
                
                const socket = io.connect(
                    'http://localhost:5555/friends-socket',{
                        transport: ['websocket'],
                        Authorization: `Bearer ${tempAKey}`,
                        withCredentials: true,
                    }
                )   
                
            }
            )
            // Grab return value of more permanent token

            // update localStorage across application

}