import { useContext } from "react"
import { Image, Icon } from "semantic-ui-react"
import { AuthContext } from "../../../../context/AuthContext"
import { DogParkContext } from "../../../../context/DogParkContext"

function FavoritePark({eachPark}){

    const { currentUser } = useContext(AuthContext)
    const { unFavorite } = useContext(DogParkContext)

    const favoritedEntryID = eachPark.favorited.filter((each)=>each.user_id === currentUser.id)[0].id

    return(

            <List.Icon 
                verticalAlign="middle" 
                size = "large" 
                name="heart"
                onClick = {()=>{unFavorite(favoritedEntryID)}}
            />
            <List.Content>
                <List.Header>{eachPark.name}</List.Header>
                <Image
                    size = 'tiny'
                    src = {eachPark.image}
                    rounded
                    bordered
                />  
            </List.Content>
        </List.Item>
    )
}

export default FavoritePark