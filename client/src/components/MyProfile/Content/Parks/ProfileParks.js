import FavoriteParks from "./FavoriteParkListEntry"

function ProfileParks () {
    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                favoriteparks
                {/* <FavoriteParks /> */}
            </div>
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