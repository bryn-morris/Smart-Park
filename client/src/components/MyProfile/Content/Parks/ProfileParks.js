import Carousel from "./Carousel/Carousel"
import { useContext } from "react"
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Title from "./Title"

import { DogParkContext } from "../../../../context/DogParkContext"
import { AuthContext } from "../../../../context/AuthContext"
import { Icon } from "semantic-ui-react"
import { useState } from "react"


function ProfileParks () {

    const {currentUser} = useContext(AuthContext)
    const {favoritedParksByUser, recentParks} = useContext(DogParkContext)

    const [sectionObject, setSectionObject] = useState({
        'Favorite Parks': true,
        'Recent Parks': false,
        'Park Reviews': false,
    })

    function generateReviewStars(starNumber){
       return(
            <div
                className="reviewStar"
            >
                {
                    Array(starNumber).fill().map((_, index)=>(
                        <Icon
                            key={index}
                            name="star"
                        /> 
                ))}
            </div>  
        )
    }

    function generateReviewCards(reviews){
        return reviews.map((eachReview)=>{
            return(
                <div 
                    className = "container"
                    key={eachReview.id}
                >
                    <div className="content">
                        {/* <div className="rating">{eachReview.rating}</div> */}
                        <div className="rating">
                            {generateReviewStars(eachReview.rating)}
                        </div>
                        <div className="username">{currentUser.username}</div>
                        <div className="textContainer">
                            <div className="text">- {eachReview.comment}</div>
                        </div>
                        <div className="dogPark">{eachReview.dog_park.name}</div>
                    </div>
                    <div className="linkContainer">
                        <ArrowRightIcon
                            className = "modalLink"
                            onClick = {()=>{console.log('redirect to dog park modal')}}
                            title = "Click here to navigate to your review"
                        />
                    </div>
                </div>
            )
        })
    }
    // grab users reviews from backend when user logs in
    // map over reviews and create a card that links to
    // specific review for park that pops up in a modal

    return(
        <div className = "parksContainer">
            <Title 
                iconName="heart" 
                title = "Favorite Parks"
                setSectionObject = {setSectionObject}
            />
            <div 
                className = {`favoritesContainer ${ 
                    sectionObject['Favorite Parks'] ? 
                    '' : 
                    'hidden'
                }`}
            >
                <Carousel 
                    dataArray = {favoritedParksByUser}
                    sectionTitle="Favorite Parks"
                />
            </div>
            <Title 
                iconName="clock outline" 
                title = "Recent Parks"
                setSectionObject = {setSectionObject}
            />
            <div 
                className = {`recentsContainer ${
                    sectionObject['Recent Parks'] ? 
                    '' : 
                    'hidden'
                }`}
            >
                <Carousel
                    dataArray = {recentParks}
                    sectionTitle={"Recent Parks"}
                />
            </div>
            <Title 
                iconName="star" 
                title = "Park Reviews"
                setSectionObject = {setSectionObject}
            />
            <div 
                className = {`reviewsContainer ${
                    sectionObject['Park Reviews'] ? 
                    '' : 
                    'hidden'
                }`}
            >
                <div className="cardsContainer">
                    {generateReviewCards(currentUser.reviews)}
                </div>
            </div>
        </div>
    )
}

export default ProfileParks