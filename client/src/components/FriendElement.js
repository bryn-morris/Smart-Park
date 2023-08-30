import { Button } from "semantic-ui-react"


function FriendElement() {

    function addFriend(friend_id) {
        fetch("/friends", {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({"friend_id" : friend_id}),
        })
            .then(r=>r.json())
            .then(console.log("response sent!"))
    }

    function deleteFriend(friend_id) {
        fetch(`/friends/${friend_id}`, {
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
                onClick={()=>{deleteFriend(4)}}
            >
                Delete Friend
            </Button>
        </div>
    )
}

export default FriendElement