import { Search, Icon} from "semantic-ui-react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { WebSocketContext } from "../../context/WebSocketContext"

function FriendsSearch ({searchedResultsList, handleSeachUser, searchedTerm}) {

        const {currentUser} = useContext(AuthContext)
        const {sendFriendRequest} = useContext(WebSocketContext) 

        const modifiedResultsList = searchedResultsList.filter((eachEl)=>eachEl.username !== currentUser.username).map((eachRes)=>{
                return {title: eachRes.username, image: eachRes.image, id: eachRes.id}
        })

        // If user is already a friend, remove icon for add friend
        // If user is a pending friend, change the icon and when user b clicks it will accept friend request

        const resultRendererFunc = ({title, image, id})=> {
            return(
                <div className="searchResult">
                    <div className = "searchResult iconContainer">
                        <Icon
                            name = "user plus"
                            id = {id}
                            className="searchResult icon"
                            title="Click to send friend request"
                            onClick = {sendFriendRequest}
                        />
                    </div>
                    <div 
                        className="searchResult userContainer"
                        title="Go to User Profile"
                    >
                        <img
                            src = {image} 
                            alt = "User Profile"
                            className="searchResult image"
                        />
                        <strong
                            className="searchResult title"
                        >
                            {title}
                        </strong>
                    </div>
                </div>
            )
        }

    return(
        <div>
            <Search
                size="big" 
                placeholder="Search Users..."
                onSearchChange={(e)=>handleSeachUser(e)}
                value = {searchedTerm}
                results={modifiedResultsList}
                resultRenderer={resultRendererFunc}
            />
        </div>
    )

}

export default FriendsSearch