import { Search, Icon} from "semantic-ui-react"

function FriendsSearch ({searchedResultsList, handleSeachUser, searchedTerm}) {

        // Within dropdown, add a heart button that allows for sendFriendRequest function to be fired
        // will need to pull sendFriendRequest from WebSocketContext

        // console.log(searchedResultsList)

        const modifiedResultsList = searchedResultsList.map((eachRes)=>{
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
                    <div className="searchResult userContainer">
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
                onSearchChange={(e) => handleSeachUser(e)}
                value = {searchedTerm}
                results={modifiedResultsList}
                resultRenderer={resultRendererFunc}
            />
        </div>
    )

}

export default FriendsSearch