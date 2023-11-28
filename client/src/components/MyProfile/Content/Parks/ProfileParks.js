import FavoritesContainer from "./Favorites/FavoritesContainer"

function ProfileParks () {

    return(
        <div className = "parksContainer">
            <FavoritesContainer />
            <div className = "recentsContainer">
                reccentparks
            </div>
            <div className = "reviewsContainer">
                reviewedparks
            </div>
        </div>
    )
}

export default ProfileParks