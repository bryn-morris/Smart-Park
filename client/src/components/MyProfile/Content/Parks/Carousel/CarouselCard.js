import { useContext, useState, useEffect } from "react"
import { Icon } from "semantic-ui-react"
import { AuthContext } from "../../../../../context/AuthContext"
import { DogParkContext } from "../../../../../context/DogParkContext"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

function CarouselCard({eachPark, sectionTitle}){

    const { currentUser } = useContext(AuthContext)
    const { unFavorite } = useContext(DogParkContext)

    const [favEntryID, setFavEntryID] = useState(null)

    useEffect(
        ()=>{
            if(sectionTitle === 'Favorite Parks'){
                setFavEntryID(()=>{
                    return(eachPark.favorited.filter((each)=>each.user_id === currentUser.id)[0].id)
                })
            }
        }
        ,[
            setFavEntryID,
            currentUser.id,
            eachPark.favorited,
            sectionTitle,
        ]
    )

    const CarouselImageContainer = styled.div`
        width: 100%;
        height: 80%;
        position: relative;

        &:hover::before{
            content:'Visit Date: ${eachPark.date_of_visit}';
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index: 1;
            background-color: grey;
            opacity: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            color: white;
            font-size: 2.5vh;
        }
    `;

    return(
            <div className="card">
                {
                    sectionTitle === 'Favorite Parks' ? 
                    <div className="imageContainer">
                        <img 
                            src = {eachPark.image}
                            alt = "park"
                            className="parkImage"
                        />
                    </div> :
                    <CarouselImageContainer>
                        <img 
                            src = {eachPark.image}
                            alt = "park"
                            className="parkImage"
                        />
                    </CarouselImageContainer>
                }
                <div className="labelContainer">
                    {
                        sectionTitle === 'Favorite Parks' ? 
                        <div
                            className="iconContainer"
                        >
                            <Icon
                                className="heartIcon"
                                name="heart"
                                title = "Remove Park from Favorites"
                                onClick = {()=>{unFavorite(favEntryID)}}
                            >
                                <Icon
                                    className="uncheckIcon"
                                    name = "times circle outline"
                                />
                            </Icon>
                        </div>
                        : 
                        null
                    }
                    <div className="label">{eachPark.name}</div>
                </div>
            </div>
    )
}

export default CarouselCard