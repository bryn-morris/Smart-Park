import { createContext, useState } from "react";

const WebSocketContext = createContext()

function WebSocketProvider({children}) {

    const [userSocket, setUserSocket] = useState(null)

    return (
        <WebSocketContext.Provider 
            value ={{
                        userSocket,
                        setUserSocket,
                    }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketContext, WebSocketProvider}