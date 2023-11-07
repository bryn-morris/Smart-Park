import ProfileHeader from './ProfileHeader'
import AccentLine from './AccentLine'

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
      <AccentLine />
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