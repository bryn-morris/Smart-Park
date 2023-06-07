import { createContext, useState } from "react";

const DogParkContext = createContext()

function DogParkProvider({children}) {

    const [dogParks, setDogParks] = useState([])
    const [searchedPark, setSearchedPark] = useState('')
    

    const specificPark = (park) => {
        setSearchedPark(park.toLowerCase())
      }
      
    const filteredParks = dogParks.filter(park => park.name.toLowerCase().includes(searchedPark))

    return (
        <DogParkContext.Provider 
            value ={{
                        dogParks,
                        setDogParks,
                        filteredParks,
                        specificPark,
                    }}
        >
            {children}
        </DogParkContext.Provider>
    )
}
export {DogParkContext, DogParkProvider}