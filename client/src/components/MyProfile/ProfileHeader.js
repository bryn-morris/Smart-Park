import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext'

function ProfileHeader () {

    const {currentUser} = useContext(AuthContext)

    return(
        <div className='Container'>
        <div className='Header'>{currentUser.username}</div>
        <div className = "ImageContainer">
          <img 
            className = "userAvatar"
            src = {currentUser.image} 
            alt = "User Profile"
          />
          <div 
            className = "Backing"
          />
        </div>
        <div className="AccentLine"/>
        <div className="cover1"/>
        <div className="cover2"/>
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