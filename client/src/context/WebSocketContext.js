import { createContext, useState, useEffect, useContext} from "react";

import { AuthContext } from "./AuthContext";

const WebSocketContext = createContext()

function WebSocketProvider({children}) {

    const [friendSocket, setFriendSocket] = useState(null)

    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{

        if (friendSocket && currentUser) {
        
            // Initial Data during connection
            friendSocket.on('connect', ()=>{
                friendSocket.emit('connection_data', {user_id: currentUser.id})
            })

            // Websocket Event Handlers below
            friendSocket.on('connection_confirm', (data)=>{
                console.log(data.message)
            })

            friendSocket.on('server_response', (data)=>{
                console.log(data.message)
            })

            
        
        }
    }, [friendSocket, currentUser])

    function closeFriendWebsocket(){
        friendSocket.disconnect()
        console.log('Sucessfully Disconnected from Friend NameSpace Websocket')
        setFriendSocket(null)
    }

    // Will need to implement reconnection logic tied to a timer if connection is lost for whatever reason
    // also will need add modularity to websocket url in config file with production and non-production variables

    return (
        <WebSocketContext.Provider 
            value ={{
                        friendSocket,
                        setFriendSocket,
                        closeFriendWebsocket,
                    }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketContext, WebSocketProvider}