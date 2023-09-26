import { Search, Icon} from "semantic-ui-react"
import { useState } from 'react'

function FriendsSearch ({searchedResultsList, handleSeachUser, searchedTerm}) {

        // Within dropdown, add a heart button that allows for sendFriendRequest function to be fired
        // will need to pull sendFriendRequest from WebSocketContext

        // console.log(searchedResultsList)

        const [isSearchOpen, setIsSearchOpen] = useState(false)

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

        const searchChangeFunc = (e) => {

            handleSeachUser(e)
            setIsSearchOpen(()=>{
                if (e.target.value === '') {
                    return false
                } else {
                    return true
                }
            })
        }

    return(
        <div>
            <Search
                open = {isSearchOpen}
                size="big" 
                placeholder="Search Users..."
                onSearchChange={searchChangeFunc}
                value = {searchedTerm}
                results={modifiedResultsList}
                resultRenderer={resultRendererFunc}
            />
        </div>
    )

}

export default FriendsSearch