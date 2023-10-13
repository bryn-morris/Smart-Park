import {Icon} from "semantic-ui-react"
import { useContext, useState, useEffect } from "react"
import { WebSocketContext } from "../../context/WebSocketContext"
import { FriendsContext } from "../../context/FriendsContext"

// tear out and refactor this component

function FriendSearchIcon ({friend_id}) {

    const [iconConfigCase, setIconConfigCase] = useState("case1")

    const {
        sendFriendRequest,
        acceptFriendRequest,
    } = useContext(WebSocketContext)

    const { friendsList, pendingFriendsList } = useContext(FriendsContext) 

    useEffect(() => {
        setIconConfigCase((prevIconConfigCase)=>{
            // conditional logic to update state on render to select icon config
            if (pendingFriendsList.some(pendFriendObj => {
                return(
                    pendFriendObj.friend_data.id === friend_id &&
                    pendFriendObj.request_metadata.sender === false
                )
            })) {
                return "case3"
            } else if (pendingFriendsList.some(pendFriendObj => {
                return(
                    pendFriendObj.friend_data.id === friend_id &&
                    pendFriendObj.request_metadata.sender === true
                )
            })) {
                return "case2"
            }else if (friendsList.some(friendObj => friendObj.friend_data.id === friend_id)) {
                return "case4"   
            } else {
                return "case1"
            }
        })
    }, [friend_id, friendsList, pendingFriendsList])
    
    const iconConfigurationMapping= {
        //     1. User a is not friends or pending friends with user b
        case1: {
            iconName : "user plus",
            className : "searchResult icon request",
            tooltipText :"Click to send friend request",
            onClickFunction : ()=>sendFriendRequest(friend_id),
        },
        //     2. User a has sent friend request already
        case2: {
            iconName : "wait",
            className : "searchResult icon sent",
            tooltipText : "You have already sent a friend request to this user!",
            onClickFunction : null
        },
        //     3. User a has option to accept friend request
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