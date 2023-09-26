import { Search, Icon} from "semantic-ui-react"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function FriendsSearch ({searchedResultsList, handleSeachUser, searchedTerm}) {

        // Within dropdown, add a heart button that allows for sendFriendRequest function to be fired
        // will need to pull sendFriendRequest from WebSocketContext

        const {currentUser} = useContext(AuthContext) 

        const modifiedResultsList = searchedResultsList.filter((eachEl)=>eachEl.username !== currentUser.username).map((eachRes)=>{
                return {title: eachRes.username, image: eachRes.image, id: eachRes.id}
        })

        const resultRendererFunc = ({title, image, id})=> {
            return(
                <div className="searchResult">
                    <div className = "searchResult iconContainer">
                        <Icon
                            name = "user plus"
                            id = {id}
                            className="searchResult icon"
                            title="Click to add Friend"
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