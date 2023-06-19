import React, {useContext, useState} from "react";

import ReviewsModal from './Reviews/ReviewsModal'
import { Icon } from "semantic-ui-react";
import { DogParkContext } from "../../context/DogParkContext";
import { AuthContext } from "../../context/AuthContext";

function DogParkCard({eachDogPark}){

  const [showFront, setShowFront] = useState(true);

  const { currentUser } = useContext(AuthContext)
  const { dogParks, setDogParks } = useContext(DogParkContext)

  const favoritedDogParks = eachDogPark.favorited.filter((each)=>each.user_id === currentUser.id)

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  const handleFavorite = (e) => {

    if (favoritedDogParks.length > 0) {
      fetch(`/favorite/${favoritedDogParks[0].id}`, {
        method: 'DELETE'
      })
        .then(r=> {
          if(r.ok){
            r.json().then(deletedDogPark => {
              return setDogParks(dogParks.map((eachDogP) => {
                 if (eachDogP.id === deletedDogPark.id) {
                  return deletedDogPark
                 }
                 return eachDogP
                }))
              // console.log(dogParks.length)
              // console.log(dogParks.filter((eachDogP)=>eachDogP.id !== deletedDogPark.id).length)
            }
              // need to return the dog park in question from the backend,
              // non-restful routing
              // hten set state
              
            )
          } else {
            console.log('error!')
          }
        })

    } else {
      fetch('/favorite', {
        method: 'POST',
        headers : {'Content-Type':'application/json'},
        body: JSON.stringify({
          user_id : currentUser.id,
          dog_park_id : eachDogPark.id,
        })
      })
        .then()
        .then()
    }
      // .then(r=>{

      //   if (r.ok) {
      //     r.json().then(
      //       favoritedDogParks.length > 0 ?
      //       resp => setDogParks(dogParks.filter((eachPark)=> eachPark.id !== eachDogPark.id))
      //       :
      //       resp => setDogParks([...dogParks, resp])
      //     )
      //   } else {
      //     r.json().then(console.log('error!'))
      //   }

    // hitting the heart will send a fetch request to the backend.
    // if isFavorited is true, it will send a delete request, 
    // if isFavorited is false, it will send a post request,
    // once backend sends back a response, change setIsFavorited, and also
    // update dog park state, as we are accessing favorited data through that state
    // probably don't even need the isFavorited state honestly, if page is going to
    // re render anyways due to dogPark state re-rendering just skip that part a
    // console.log(favoritedDogParks[0].id)
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
        name={favoritedDogParks.length > 0 ? 'heart' : "heart outline"} 
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
    