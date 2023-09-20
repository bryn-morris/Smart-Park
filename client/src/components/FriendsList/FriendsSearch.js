import { Search } from "semantic-ui-react"

function FriendsSearch ({userList}) {

        // Within dropdown, add a heart button that allows for sendFriendRequest function to be fired
        // will need to pull sendFriendRequest from WebSocketContext

        console.log(userList)

    return(
        <div>
            <Search />
        </div>
    )

}

export default FriendsSearch