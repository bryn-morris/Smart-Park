import Carousel from "./Carousel/Carousel"
import { useContext } from "react"

import { DogParkContext } from "../../../../context/DogParkContext"
import { AuthContext } from "../../../../context/AuthContext"
import { Icon } from "semantic-ui-react"

function ProfileParks () {

    const {currentUser} = useContext(AuthContext)
    const {favoritedParksByUser, recentParks} = useContext(DogParkContext)

    console.log(currentUser)

    function generateReviewCards(reviews){
        return reviews.map((eachReview)=>{
            return(
                <div 
                    className = "container"
                    key={eachReview.id}
                >
                    <div className="rating">{eachReview.rating}</div>
                    <div className="username">{currentUser.username}</div>
                    <div className="text">{eachReview.comment}</div>
                    <div className="dogPark">{eachReview.dog_park.name}</div>
                </div>
            )
        })
    }
    // grab users reviews from backend when user logs in
    // map over reviews and create a card that links to
    // specific review for park that pops up in a modal

    return(
        <div className = "parksContainer">
            <div className = "favoritesContainer">
                <Carousel 
                    dataArray = {favoritedParksByUser}
                    sectionTitle="Favorite Parks"
                />
            </div>
            <div className = "recentsContainer">
                <Carousel
                    dataArray = {recentParks}
                    sectionTitle={"Recent Parks"}
                />
            </div>
            <div className = "reviewsContainer">
                <div className="titleContainer">
                    <Icon 
                        name="star icon"
                        className="starIcon"
                    />
                    <div className='title'>Reviews</div>
                </div>
                {generateReviewCards(currentUser.reviews)}
            </div>
        </div>
    )
}

export default ProfileParks