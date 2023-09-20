import { useContext } from "react"
import { FriendsContext } from "../../context/FriendsContext"
import FriendCard from "./FriendCard"


function FriendListElement() {

    const { friendsList } = useContext(FriendsContext)

    return (
        <div className="FriendListElement">
            {friendsList.map((eachFr)=>{
                return (<FriendCard key = {eachFr.id} eachFr = {eachFr}/>)
            })}
        </div>
    )
}

export default FriendListElement