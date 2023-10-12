import {Icon} from "semantic-ui-react"
import { useContext, useState, useEffect } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { FriendsContext } from "../../context/FriendsContext"

function FriendSearchIcon ({friend_id}) {

    const [iconConfigCase, setIconConfigCase] = useState("case2")

    const {sendFriendRequest, acceptFriendRequest} = useContext(WebSocketContext)
    const { friendsList, pendingFriendsList } = useContext(FriendsContext) 

    
    const iconConfigurationMapping= {
        //     1. User a is not friends or pending friends with user b
        case1: {
            iconName : "user plus",
            className : "searchResult icon request",
            tooltipText :"Click to send friend request",
            onClickFunction : ()=>sendFriendRequest(friend_id),
        },
        //     2. User a has sent friend request already
        // classname points to css that shows disabled button or greyed out option
        case2: {
            iconName : "wait",
            className : "searchResult icon sent",
            tooltipText : "You have already sent a friend request to this user!",
            onClickFunction : null
        },
        //     3. User a has option to accept friend request
        // classname points to css that lets user click button similar to sending friend request
        case3: {
            iconName : "check circle outline",
            className : "searchResult icon accept",
            tooltipText : "Accept Friend Request",
            onClickFunction : () => acceptFriendRequest(friend_id)
        },
        //     4. User a is already friends with this user b
        case4: {
            iconName : null,
            className : null,
            tooltipText : null,
            onClickFunction : null
        },
    };

    // useEffect(() => {
    //     setIconConfigCase((prevIconConfigCase)=>{
    //         // conditional logic to update state on render to select icon config
    //     })

    // }, [])

    function searchIconConstructor({iconName, className, tooltipText, onClickFunction}) {
        return (
            <Icon 
                name = {iconName}
                className= {className}
                title = {tooltipText}
                onClick = {onClickFunction}
            />
        )
    }

    return(
        <div>
            {searchIconConstructor(iconConfigurationMapping[iconConfigCase])}
        </div>
    )
}

export default FriendSearchIcon