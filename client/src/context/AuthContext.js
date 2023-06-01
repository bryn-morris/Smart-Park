import { createContext, useState } from "react";

const AuthContext = createContext()

function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <AuthContext.Provider 
            value ={{
                        currentUser,
                        setCurrentUser,
                    }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthProvider}