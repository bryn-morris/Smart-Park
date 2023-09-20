import { Button } from "semantic-ui-react"



function FriendsListButton ({isFriendsModalShowing, setIsFriendsModalShowing}) {

    // Turn this into a fancy modal with custom styling so that when user clicks
    // Information renders. I am currently thinking a round dog par button
    // and when the user clicks the friends show up in a radial pattern and
    // can be scrolled through, when you hover over a friend their dogs show
    // up further outside the friends radial section. When you scroll, searchbar
    // 'stays' at the top of the radial circle, and individual friend elements dissappear

    return(
        <Button
            
            onClick={()=>setIsFriendsModalShowing(!isFriendsModalShowing)}
        >
            Sample Text
        </Button>
    )
}

export default FriendsListButton