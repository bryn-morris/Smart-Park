import { createContext, useState } from "react";

const FriendsContext = createContext()

function FriendsProvider({children}) {

    const [friendsList, setFriendsList] = useState([])

    return (
        <FriendsContext.Provider 
            value ={{
                        friendsList,
                        setFriendsList,
                    }}
        >
            {children}
        </FriendsContext.Provider>
    )
}
export {FriendsContext, FriendsProvider}