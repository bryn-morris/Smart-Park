import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [isReLogOpen, setIsReLogOpen] = useState(false)

    return (
        <AuthContext.Provider 
            value ={{
                        currentUser,
                        setCurrentUser,
                        isReLogOpen,
                        setIsReLogOpen
                    }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthProvider}