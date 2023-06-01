import { createContext, useState } from "react";

const DogContext = createContext()

function DogProvider({children}) {

    const [dogs, setDogs] = useState(null)

    return (
        <DogContext.Provider 
            value ={{
                        dogs,
                        setDogs,
                    }}
        >
            {children}
        </DogContext.Provider>
    )
}
export {DogContext, DogProvider}