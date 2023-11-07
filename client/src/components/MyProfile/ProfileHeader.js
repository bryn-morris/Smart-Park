import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext'

function ProfileHeader () {

    const {currentUser} = useContext(AuthContext)

    return(
        <div className='Container'>
        <div className='Header'>My Profile</div>
        <div className = "ImageContainer">
          <img 
            className = "userAvatar"
            src = {currentUser.image} 
            alt = "User Profile"
          />
        </div>
        <div className = "DetailsContainer">
          <div className='BadgeContainer'>
            <div className='Badge'>[SAMPLE BADGE]</div>
          </div>
          <div className='CurrencyContainer'>
            <div className ='Currency'>[SAMPLE CURRENCY]</div>
          </div>
        </div>
      </div>
    )
}

export default ProfileHeader