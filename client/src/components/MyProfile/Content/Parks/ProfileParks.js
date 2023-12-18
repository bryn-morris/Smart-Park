import Carousel from "./Carousel/Carousel"
import { useContext } from "react"
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

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
                    <div className="textContainer">
                        <div className="text">- {eachReview.comment}</div>
                    </div>
                    <div className="dogPark">{eachReview.dog_park.name}</div>
                    <ArrowRightIcon
                        className = "modalLink"
                        onClick = {()=>{console.log('redirect to dog park modal')}}
                        title = "Click here to navigate to your review"
                    />
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
                        name="star"
                        className="starIcon"
                    />
                    <div className='title'>Reviews</div>
                </div>
                <div className="cardsContainer">
                    {generateReviewCards(currentUser.reviews)}
                </div>
            </div>
        </div>
    )
}

export default ProfileParks