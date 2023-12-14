import Carousel from "./Carousel/Carousel"
import { useContext } from "react"

import { DogParkContext } from "../../../../context/DogParkContext"

function ProfileParks () {

    const {favoritedParksByUser, recentParks} = useContext(DogParkContext)

    console.log(recentParks)

    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                <Carousel 
                    dataArray = {favoritedParksByUser}
                    sectionTitle="Favorite Parks"
                />
            </div>
            <div className = "recentsContainer">
                recentparks
            </div>
            <div className = "reviewsContainer">
                reviewedparks
            </div>
        </div>
    )
}

export default ProfileParks