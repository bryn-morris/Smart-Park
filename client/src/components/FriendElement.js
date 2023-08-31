import { Button } from "semantic-ui-react"


function FriendElement() {

    // Create a Catch to handle error responses!
    // also logic to handle different responses from
    // The friendship decorator on the backend
    
    // include some sort of logic so that if a user accepts
    // a pending request then change 'request_status' key from false
    // to true, otherwise default to false, maybe pass in as an argument
    // that  is true and overwrite key value to argument
    // value but only provide this value if pending request is accepted?
    

    function addFriend(friend_id) {

        const requestBody = {
            "friend_id" : friend_id,
            "request_status" : false,
        }

        fetch("/friends", {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(requestBody),
        })
            .then(r=>r.json())
            .then(console.log)
    }

    function deleteFriend(friendship_id) {
        fetch(`/friends/${friendship_id}`, {
            method: "DELETE",
        })
    }

    return (
        <div className="FriendModal">
            <Button
                onClick={()=>{addFriend(4)}}
            >
                Add Friend
            </Button>
            <Button
                onClick={()=>{deleteFriend(5)}}
            >
                Delete Friend
            </Button>
        </div>
    )
}

export default FriendElement