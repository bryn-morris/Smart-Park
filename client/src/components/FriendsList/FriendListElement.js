import { useContext } from "react"
import { FriendsContext } from "../../context/FriendsContext"
import FriendCard from "./FriendCard"
import FriendsSearch from "./FriendsSearch"


function FriendListElement() {

    const { friendsList } = useContext(FriendsContext)

    return (
        <div className="FriendsListElement">
            <div className="FriendsSeachContainer">
                <FriendsSearch />
            </div>
            <div className="FriendsCardsContainer">
                {friendsList.map((eachFr)=>{
                    return (<FriendCard key = {eachFr.id} eachFr = {eachFr}/>)
                })}
            </div>

        </div>
    )
}

export default FriendListElement