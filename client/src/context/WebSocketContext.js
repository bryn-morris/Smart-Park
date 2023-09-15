import { createContext, useState, useEffect, } from "react";

const WebSocketContext = createContext()

function WebSocketProvider({children}) {

    const [friendSocket, setFriendSocket] = useState(null)

    useEffect(()=>{
        if (friendSocket) {
            friendSocket.connect()
        }
    }, [friendSocket])

    if (friendSocket){

        friendSocket.on('connection_confirm', (data)=>{
            console.log(data.message)
        })


    }

    return (
        <WebSocketContext.Provider 
            value ={{
                        friendSocket,
                        setFriendSocket,
                    }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketContext, WebSocketProvider}