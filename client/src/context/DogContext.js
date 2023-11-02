import { createContext, useState } from "react";

const DogContext = createContext()

function DogProvider({children}) {

    const [dogs, setDogs] = useState(null)

    const createDog = (newDog) => {
        setDogs([...dogs, newDog])
      }
    
    const showRemainingDogs = (id) => {
        const newDogArray = dogs.filter(dogObj => dogObj.id !== id)
        setDogs(newDogArray)
    }
    
      const updatedDogs = (editedDog) => {
        const changedDogArr = dogs.map(dog => {
          return (dog.id !== editedDog.id ? dog : editedDog)
        })
        setDogs(changedDogArr)
      }

    return (
        <DogContext.Provider 
            value ={{
                        dogs,
                        setDogs,
                        createDog,
                        showRemainingDogs,
                        updatedDogs, 
                    }}
        >
            {children}
        </DogContext.Provider>
    )
}
export {DogContext, DogProvider}