import MyDogCards from './MyDogCards'
import NewDogForm from './NewDogForm'
import FavoriteParkListEntry from './FavoriteParkListEntry'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { DogContext } from '../../context/DogContext'
import { DogParkContext } from "../../context/DogParkContext"
import { List } from 'semantic-ui-react'


function Profile() {
    
  const {dogs} = useContext(DogContext)
  const {currentUser} = useContext(AuthContext)
  const { favoritedParksByUser } = useContext(DogParkContext)

  const myDogs = dogs.map((dog)=>{
      return(
        <MyDogCards 
          key = {dog.id} 
          dog = {dog}
        />
      )
    }
  )

  return (
    <div className = "MyProfile">
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
      
      {/* <List>
        {favoritedParksByUser.map((eachPark)=>{return(
          <FavoriteParkListEntry key = {eachPark.id} eachPark = {eachPark}/>
        )})}
      </List> */}
      {/* <div>
        <NewDogForm />
      </div>
        {myDogs} */}
    </div>
  )
}

export default Profile