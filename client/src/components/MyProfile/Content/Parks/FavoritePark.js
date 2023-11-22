import { useContext } from "react"
import { Icon } from "semantic-ui-react"
import { AuthContext } from "../../../../context/AuthContext"
import { DogParkContext } from "../../../../context/DogParkContext"

function FavoritePark({eachPark}){

    const { currentUser } = useContext(AuthContext)
    const { unFavorite } = useContext(DogParkContext)

    const favoritedEntryID = eachPark.favorited.filter((each)=>each.user_id === currentUser.id)[0].id

    return(
        <div className="card">
            <img 
                src = {eachPark.image}
                alt = "park"
                className="parkImage"
            />
            <div className="labelContainer">
                <Icon
                    className="heartIcon"
                    name="heart"
                    onClick = {()=>{unFavorite(favoritedEntryID)}}
                />
                <div className="label">{eachPark.name}</div>
            </div>
        </div>
    )
}

export default FavoritePark