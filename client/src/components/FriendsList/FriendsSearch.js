import { Search, Icon, Image } from "semantic-ui-react"

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
                    <Image
                        avatar
                        bordered
                        src = {image} 
                        alt= "User Profile"
                        className = "profileButtonImage"
                    />
                    <strong>{title}</strong>
                    <Icon
                        name = "heart"
                        id = {id}
                    />
                </div>
            )
        }


    return(
        <div>
            <Search 
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