import { Button } from "semantic-ui-react"



function FriendsListButton ({isFriendsModalShowing, setIsFriendsModalShowing}) {


    return(
        <Button onClick={()=>setIsFriendsModalShowing(!isFriendsModalShowing)}>
            Sample Text
        </Button>
    )
}

export default FriendsListButton