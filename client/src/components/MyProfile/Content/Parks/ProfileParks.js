import FavoriteParks from "./FavoriteParkListEntry"

function ProfileParks () {
    return(
        <div className = "parksContainer">
            <div className = "favorites">
                favoriteparks
                {/* <FavoriteParks /> */}
            </div>
            <div className = "recents">
                reccentparks
            </div>
            <div className = "reviews">
                reviewedparks
            </div>
        </div>

        
    )
}

export default ProfileParks