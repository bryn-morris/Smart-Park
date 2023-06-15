import React, {useContext, useState} from "react";

import ReviewsModal from './Reviews/ReviewsModal'
import { Icon } from "semantic-ui-react";
import { DogParkContext } from "../../context/DogParkContext";
import { AuthContext } from "../../context/AuthContext";

function DogParkCard({eachDogPark}){

  const [showFront, setShowFront] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const { dogParks, setDogParks } = useContext(DogParkContext)

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  const handleFavorite = (e) => {

    // request from backend will need to be attached to dog parks
    // if user.id is in eachDogPark.favorited.id, then set isFavorited to True
    // else set it to false - this will establish persistent favoriting across
    // screen refreshes,
    // hitting the heart will send a fetch request to the backend.
    // if isFavorited is true, it will send a delete request, 
    // if isFavorited is false, it will send a post request,
    // once backend sends back a response, change setIsFavorited, and also
    // update dog park state, as we are accessing favorited data through that state
    // probably don't even need the isFavorited state honestly, if page is going to
    // re render anyways due to dogPark state re-rendering just skip that part a
    console.log(eachDogPark.favorited.filter((each)=>each.user_id === currentUser.id))
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
        name={(eachDogPark.favorited.filter(
          (each)=>each.user_id === currentUser.id).length > 0
          ) ? 'heart' : "heart outline"} 
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
    