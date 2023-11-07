import { Switch, Route } from 'react-router-dom/cjs/react-router-dom'
import ProfileHeader from './ProfileHeader'
import ContentContainer from './Content/ContentContainer'

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
      <ContentContainer />

      <Switch>
        <Switch>
          <Route path = "/profile/parks">
            {/* <ProfileParks/> */}
          </Route>
          <Route path = "/profile/badges">
            {/* <ProfileBadges/> */}
          </Route>
          <Route path = "/profile/friends">
            {/* <ProfileFriends/> */}
          </Route>
          <Route path = "/profile/pets">
            {/* <ProfilePets/> */}
          </Route>
        </Switch>
      </Switch>

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