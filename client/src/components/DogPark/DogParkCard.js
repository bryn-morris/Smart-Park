import React, {useState} from "react";

import ReviewsModal from './Reviews/ReviewsModal'

function DogParkCard({eachDogPark}){
  const [showFront, setShowFront] = useState(true);

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  return (
  <div className="dpcontainer">
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
    