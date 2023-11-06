import MyDogCards from './MyDogCards'
import NewDogForm from './NewDogForm'
import FavoriteParkListEntry from './FavoriteParkListEntry'
import { useContext } from 'react'
import { DogContext } from '../../context/DogContext'
import { DogParkContext } from "../../context/DogParkContext"
import { List } from 'semantic-ui-react'


function Profile() {
    
  const {dogs} = useContext(DogContext)
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
    // <div 
    //   className = 'myAcctBack' 
    //   style={{backgroundImage:"url('https://img.freepik.com/free-photo/grungy-gray-marble-textured-background_53876-108405.jpg?w=2000')"}}
    // >
    <div className = "MyProfile">
      <h1 className='accountHeader'>My Account</h1>
      <List>
        {favoritedParksByUser.map((eachPark)=>{return(
          <FavoriteParkListEntry key = {eachPark.id} eachPark = {eachPark}/>
        )})}
      </List>
      <div>
        <NewDogForm />
      </div>
        {myDogs}
    </div>
  )
}

export default Profile