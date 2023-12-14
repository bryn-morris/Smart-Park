import { useContext, useState, useEffect } from "react"
import { Icon } from "semantic-ui-react"
import { AuthContext } from "../../../../../context/AuthContext"
import { DogParkContext } from "../../../../../context/DogParkContext"

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

    return(
        <div className="card">
            <img 
                src = {eachPark.image}
                alt = "park"
                className="parkImage"
            />
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
                    <div
                        className="dateContainer"
                    >
                        <div
                            className="date"
                        >
                            {eachPark.date_of_visit}
                        </div>
                    </div>
                }
                <div className="label">{eachPark.name}</div>
            </div>
        </div>
    )
}

export default CarouselCard