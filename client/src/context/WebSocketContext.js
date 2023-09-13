import { createContext} from "react";
import io from 'socket.io-client'

const WebSocketContext = createContext()

function WebSocketProvider({children}) {

    // Need to solve websocket cors issue
    const socket = io('http://localhost:5555')

    return (
        <WebSocketContext.Provider 
            value ={{

                    }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}
export {WebSocketContext, WebSocketProvider}