import MyDogCards from './MyDogCards'
import NewDogForm from './NewDogForm'



function MyAccount({dogs, showRemainingDogs, updatedDogs, createDog, currentUser}) {
    
    const myDogs = dogs.map((dog)=>{
        return(<MyDogCards key = {dog.id} {...dog} showRemainingDogs={showRemainingDogs} updatedDogs={updatedDogs}/>)
        }
    )

  return (
    <div style={{backgroundImage:"url('https://img.freepik.com/free-photo/grungy-gray-marble-textured-background_53876-108405.jpg?w=2000')"}}>
      <h1 className='accountHeader'>My Account</h1>
      <div>
        <NewDogForm createDog={createDog} dogs={dogs} currentUser={currentUser}/>
      </div>
        {myDogs}
    </div>
  )
}

export default MyAccount