import FavoritesContainer from "./Favorites/FavoritesContainer"
import RecentsContainer from "./FavRecents/RecentsContainer"
import ReviewsContainer from "./FavReviews/ReviewsContainer"

function ProfileParks () {

    return(
        <div className = "parksContainer">
            <FavoritesContainer />
            <RecentsContainer />
            <ReviewsContainer />
        </div>
    )
}

export default ProfileParks