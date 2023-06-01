import MyDogCards from './MyDogCards'
import NewDogForm from './NewDogForm'
import { useContext } from 'react'
import { DogContext } from '../../context/DogContext'


function MyAccount({showRemainingDogs, updatedDogs, createDog, currentUser}) {
    
  const {dogs} = useContext(DogContext)

    const myDogs = dogs.map((dog)=>{
        return(
          <MyDogCards 
            key = {dog.id} 
            dog = {dog}
            showRemainingDogs={showRemainingDogs} 
            updatedDogs={updatedDogs}
          />
        )
      }
    )

  return (
    <div 
      className = 'myAcctBack' 
      style={{backgroundImage:"url('https://img.freepik.com/free-photo/grungy-gray-marble-textured-background_53876-108405.jpg?w=2000')"}}
    >
      <h1 className='accountHeader'>My Account</h1>
      <div>
        <NewDogForm 
          createDog={createDog}
        />
      </div>
        {myDogs}
    </div>
  )
}

export default MyAccount