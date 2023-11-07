import MyDogCards from './MyDogCards'
import NewDogForm from './NewDogForm'
import FavoriteParkListEntry from './FavoriteParkListEntry'
import { useContext } from 'react'
import { DogContext } from '../../context/DogContext'
import { DogParkContext } from "../../context/DogParkContext"
import { List } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'


function Profile() {
    
  // const {dogs} = useContext(DogContext)
  // const { favoritedParksByUser } = useContext(DogParkContext)

  // const myDogs = dogs.map((dog)=>{
  //     return(
  //       <MyDogCards 
  //         key = {dog.id} 
  //         dog = {dog}
  //       />
  //     )
  //   }
  // )

  return (
    <div className = "MyProfile">
      <ProfileHeader />
      <div className = "ContentWindow">

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