import React, {useContext, useState} from "react";

import ReviewsModal from './Reviews/ReviewsModal'
import { Icon } from "semantic-ui-react";
import { DogParkContext } from "../../context/DogParkContext";
import { AuthContext } from "../../context/AuthContext";
import EditDogParkModal from "./EditDogParkModal";

function DogParkCard({eachDogPark}){

  const [showFront, setShowFront] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen ] = useState(false);

  const { currentUser } = useContext(AuthContext)
  const { dogParks, setDogParks, unFavorite } = useContext(DogParkContext)
  
  const favoritedEntryArray = eachDogPark.favorited.filter((each)=>each.user_id === currentUser.id)

  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  const handleFavorite = (e) => {

    if (favoritedEntryArray.length > 0) {
      unFavorite(favoritedEntryArray[0].id)
    } else {
      fetch('/favorite', {
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({
          user_id : currentUser.id,
          dog_park_id : eachDogPark.id,
        })
      })
        .then(r=> {
          if (r.ok){
            r.json().then(selectedDogPark => {
              return setDogParks(dogParks.map((eachDogP) => {
                if (eachDogP.id === selectedDogPark.id) {
                  return selectedDogPark
                }
                return eachDogP
              }))
            })
          } else {
            console.log('error!')
          }
        })
    }
  }

  const handleDelete = (e) => {
    fetch(`/dogparks/${eachDogPark.id}`,{
      method : "DELETE"
    })
      .then(r=>r.json())
      .then(setDogParks(
        dogParks.filter((eachDP)=>{return eachDP.id !== eachDogPark.id})
      ))
  }

  const handleEdit = (e) => {
    setIsEditModalOpen(true)
  }

  return (
  <div className="dpc Container">
      <Icon 
        name={favoritedEntryArray.length > 0 ? 'heart' : "heart outline"} 
        onClick = {handleFavorite}
      />
      {currentUser.admin ?
        <Icon
          name = 'delete'
          onClick = {handleDelete}
        />: 
        null}
      {currentUser.admin ?
        <Icon
          name = 'edit'
          onClick = {handleEdit}
        />:
        null}
      <div onClick={handleFlip}>
        <h1 className="dpc Name">{eachDogPark.name}</h1>
        
        {showFront ? (
          <div>
            
            <img className="dpc Img" src={eachDogPark.image} alt={eachDogPark.name} />
            <div className="dpc Name" >
              {eachDogPark.rating ? `⭐${eachDogPark.rating} Stars⭐` : 'No Rating!'}
            </div>
          </div>
        ) : (
          <div className="dpc Name">
            <p>{`Amenities: ${eachDogPark.amenities}`}</p>
            <p>{`Address: ${eachDogPark.address}`}</p>
          </div>
        )}
      </div>
      <div>
        <ReviewsModal 
          key={eachDogPark.id}
          eachDogPark = {eachDogPark}
        />
      </div>
      <div>
        <EditDogParkModal
          key = {eachDogPark.id}
          eachDogPark = {eachDogPark}
          isEditModalOpen = {isEditModalOpen}
          setIsEditModalOpen = {setIsEditModalOpen}
        />
      </div>
    </div>
  );
}

export default DogParkCard
    