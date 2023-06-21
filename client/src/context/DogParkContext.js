import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const DogParkContext = createContext()

function DogParkProvider({children}) {

    const [dogParks, setDogParks] = useState([])
    const [searchedPark, setSearchedPark] = useState('')
    const { currentUser } = useContext(AuthContext)
    
    const filteredParks = dogParks.filter(park => park.name.toLowerCase().includes(searchedPark))
    const favoritedParksByUser = dogParks.filter((eachPark)=>eachPark.favorited.some((eachFav)=>eachFav.user_id === currentUser.id))
    
    const specificPark = (park) => {
        setSearchedPark(park.toLowerCase())
    }

    function unFavorite (favoritedEntryID) {
        fetch(`/favorite/${favoritedEntryID}`, {
            method: 'DELETE'
          })
            .then(r=> {
              if(r.ok){
                r.json().then(selectedDogPark => {
                  return setDogParks(dogParks.map((eachDogP) => {
                    if (eachDogP.id === selectedDogPark.id) {
                      return selectedDogPark
                    }
                    return eachDogP
                  }))
                  })
              } else {
                console.log('error!')
              }
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
                        unFavorite
                    }}
        >
            {children}
        </DogParkContext.Provider>
    )
}
export {DogParkContext, DogParkProvider}