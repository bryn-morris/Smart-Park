import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import fetchData from "../utils/fetch_util";

const DogParkContext = createContext()

function DogParkProvider({children}) {

    const [dogParks, setDogParks] = useState([])
    const [searchedPark, setSearchedPark] = useState('')
    const [recentParks, setRecentParks] =useState([])

    const { currentUser, setIsReLogOpen } = useContext(AuthContext)

    const filteredParks = dogParks.filter(park => park.name.toLowerCase().includes(searchedPark))
    const favoritedParksByUser = dogParks.filter((eachPark)=>eachPark.favorited.some((eachFav)=>eachFav.user_id === currentUser.id))
    
    const specificPark = (park) => {
        setSearchedPark(park.toLowerCase())
    }

    function unFavorite (favoritedEntryID) {
      fetchData(`/favorite/${favoritedEntryID}`, setIsReLogOpen, {method: 'DELETE'})
        .then(selectedDogPark => {
          return setDogParks(dogParks.map((eachDogP) => {
            if (eachDogP.id === selectedDogPark.id) {
              return selectedDogPark
            }
            return eachDogP
          }))
        })
    }

    return (
        <DogParkContext.Provider 
            value ={{
                        dogParks,
                        setDogParks,
                        filteredParks,
                        specificPark,
                        favoritedParksByUser,
                        unFavorite,
                        recentParks,
                        setRecentParks,
                    }}
        >
            {children}
        </DogParkContext.Provider>
    )
}
export {DogParkContext, DogParkProvider}