import { useContext, useEffect, useState } from "react"
import { FriendsContext } from "../../context/FriendsContext"
import FriendCard from "./FriendCard"
import FriendsSearch from "./FriendsSearch"


function FriendListElement() {

    const { friendsList } = useContext(FriendsContext)

    const [userList, setUserList] = useState([]) 

    useEffect(()=>{
        // write fetch to query all users in the database, have this component mount and clean up after itself after
        // component opens and closes, respectively

        fetch('/users')
            .then(r => r.json())
            .then(users => setUserList(users))
    },[setUserList])

    console.log(userList)

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