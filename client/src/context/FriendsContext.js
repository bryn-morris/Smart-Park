import { createContext, useState } from "react";

const FriendsContext = createContext()

function FriendsProvider({children}) {

    const [friendsList, setFriendsList] = useState([])
    const [pendingFriendsList, setPendingFriendsList] = useState([])

    console.log(friendsList)

    return (
        <FriendsContext.Provider 
            value ={{
                        friendsList,
                        setFriendsList,
                        pendingFriendsList,
                        setPendingFriendsList,
                    }}
        >
            {children}
        </FriendsContext.Provider>
    )
}
export {FriendsContext, FriendsProvider}