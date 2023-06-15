import React, {useContext, useState} from "react";

import ReviewsModal from './Reviews/ReviewsModal'
import { Icon } from "semantic-ui-react";
import { DogParkContext } from "../../context/DogParkContext";

function DogParkCard({eachDogPark}){

  const [showFront, setShowFront] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false)

  const { dogParks, setDogParks } = useContext(DogParkContext)

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  const handleFavorite = (e) => {

    // fetch patch using eachdogPark.id to update backend
      // will need to be a list - sqlite3 can't support lists
      // may need to store as a string and use regex to pull id's of dog parks out of string
      // Would be a great opportunity to learn how to setup follower tables
    // once server has reflected change, update frontend setIsFavorited(!isFavorited);
    // in the meantime change color of heart to grey
    console.log("Is this favoriting working?")
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
    console.log("Is this edit working?")
    // Create a Dog Park Edit Modal and edit the fields from there
    // send the patch request to the backend, process
    // and update dog park state on the frontend
  }

  return (
  <div className="dpcontainer">
      <Icon 
        name={isFavorited ? 'heart' : "heart outline"} 
        onClick = {handleFavorite}
      />
      <Icon
        name = 'delete'
        onClick = {handleDelete}
      />
      <Icon
        name = 'edit'
        onClick = {handleEdit}
      />
      <div onClick={handleFlip}>
        <h1 className="dpcName">{eachDogPark.name}</h1>
        
        {showFront ? (
          <div>
            
            <img className="dpcImg" src={eachDogPark.image} alt={eachDogPark.name} />
            <div className="dpcName" >
              {eachDogPark.rating ? `⭐${eachDogPark.rating} Stars⭐` : 'No Rating!'}
            </div>
          </div>
        ) : (
          <div className="dpcName">
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
    </div>
  );
}

export default DogParkCard
    