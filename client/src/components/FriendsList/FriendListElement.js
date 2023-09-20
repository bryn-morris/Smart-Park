import { useContext, useEffect, useState, useMemo } from "react"
import { FriendsContext } from "../../context/FriendsContext"
import { AbortController } from 'abort-controller'
import FriendCard from "./FriendCard"
import FriendsSearch from "./FriendsSearch"


function FriendListElement() {

    const { friendsList } = useContext(FriendsContext);

    const [userList, setUserList] = useState([]);

    const {controller, signal} = useMemo(()=>{

        const controller = new AbortController();
        const signal = controller.signal;

        return({controller, signal})
    },[])

    useEffect(()=>{
        // write fetch to query all users in the database, have this component mount and clean up after itself after
        // component opens and closes, respectively

        fetch('/users',{
            signal: signal,
        })
            .then(r =>{
                if (!r.ok) {
                    console.error('Network Error')
                }
                return r.json()
            })
            .then(users => setUserList(users))
            .catch((error)=>{
                console.error('User Fetch Error:', error)
            })
        
        return( ()=>{
            // This will cancel request if component is unmounted before frontend receives promise
            controller.abort();
        }
        )
    }
    ,[signal, controller])

    return (
        <div className="FriendsListElement">
            <div className="FriendsSeachContainer">
                <FriendsSearch userList = {userList}/>
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