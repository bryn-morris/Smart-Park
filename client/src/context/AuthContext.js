import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [isReLogOpen, setIsReLogOpen] = useState(false)
    const [isLogOutModalRendered, setIsLogOutModalRendered] = useState(false)
    const [authKey, setAuthKey] = useState(localStorage.getItem('aKey') || null)

    const authConfigObj = {
        headers:{
            Authorization: `Bearer ${authKey}`
        }
    }

    return (
        <AuthContext.Provider 
            value ={{
                        currentUser,
                        setCurrentUser,
                        isReLogOpen,
                        setIsReLogOpen,
                        isLogOutModalRendered,
                        setIsLogOutModalRendered,
                        authKey,
                        setAuthKey,
                        authConfigObj,
                    }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthProvider}