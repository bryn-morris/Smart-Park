import { useContext, useEffect, useState, useMemo } from "react"
import { FriendsContext } from "../../context/FriendsContext"
import AbortController from "abort-controller"
import FriendCard from "./FriendCard"
import FriendsSearch from "./FriendsSearch"


function FriendListElement() {

    const { friendsList } = useContext(FriendsContext);

    const [userList, setUserList] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState('')
    const [searchedResultsList, setSearchedResultsList] = useState(userList)

    // Add two tabs, one for current friends, and one for pending friendships
    // there should be an accept button next to pending friendships

    const {controller, signal} = useMemo(()=>{

        const controller = new AbortController();
        const signal = controller.signal;

        return({controller, signal})
    },[])

    useEffect(()=>{

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

    const handleSeachUser = (e) => {
        setSearchedTerm(e.target.value)


        setSearchedResultsList(userList.filter(eachUser => {
            return eachUser.username.includes(searchedTerm.toLowerCase())
        }))
    }

    return (
        <div className="FriendsListElement">
            <div className="FriendsSeachContainer">
                <FriendsSearch 
                    searchedResultsList = {searchedResultsList}
                    handleSeachUser = {handleSeachUser}
                    searchedTerm = {searchedTerm}
                />
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