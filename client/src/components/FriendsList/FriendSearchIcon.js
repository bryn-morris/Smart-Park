import {Icon} from "semantic-ui-react"
import { useContext, useState, useEffect } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { FriendsContext } from "../../context/FriendsContext"

function FriendSearchIcon ({friend_id}) {

    const [iconConfigCase, setIconConfigCase] = useState("case1")

    const {sendFriendRequest} = useContext(WebSocketContext)
    const { friendsList, pendingFriendsList } = useContext(FriendsContext) 

    const iconConfiguration= {
        //     1. User a is not friends or pending friends with user b
        case1: {
            iconName : "user plus",
            tooltipText :"Click to send friend request",
            onClickFunction : ()=>sendFriendRequest(friend_id),
        },
        //     2. User a has sent friend request already
        case2: {

        },
        //     3. User a has option to accept friend request
        case3: {
            // 
        },
        //     4. User a is already friends with this user b
        case4: {
            iconName : null,
            tooltipText : null,
            onClickFunction : null
        },
    };

    useEffect(() => {
        setIconConfigCase((prevIconConfigCase)=>{
            // conditional logic to update state on render to select icon config
        })

    }, [])

    function searchIconConstructor({iconName, tooltipText, onClickFunction}) {
        return (
            <Icon 
                name = {iconName}
                className="searchResult icon"
                title = {tooltipText}
                onClick = {onClickFunction}
            />
        )
    }



    return(
        <div>
            {searchIconConstructor(iconConfiguration[iconConfigCase])}
        </div>
    )
}

export default FriendSearchIcon