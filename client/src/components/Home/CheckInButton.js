import { Icon } from "semantic-ui-react"

function CheckInButton () {

    return(
        <div className="CheckInButton">
            <Icon className = 'massive ui green dogPawIcon1' name = 'paw'>
                <div id = 'checkInFeature1'>?</div>
                <div id = 'checkInFeature2'>?</div> 
                <div id = 'checkInFeature3'>!</div>
                <div id = 'checkInFeature4'>?</div> 
            </Icon>
        </div>
    )
}

export default CheckInButton