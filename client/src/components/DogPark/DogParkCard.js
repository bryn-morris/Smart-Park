import React, {useState} from "react";

import ReviewsModal from './ReviewsModal'

function DogParkCard({id, name, address, amenities, rating, image, reviews, finddpbi}){
  const [showFront, setShowFront] = useState(true);

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  return (
  <div className="dpcontainer">
      <div onClick={handleFlip}>
        <h1 className="dpcName">{name}</h1>
        {showFront ? (
          <div>
            <img className="dpcImg" src={image} alt={name} />
            <div className="dpcName" >
              {`⭐${rating} Stars⭐`}
            </div>
          </div>
        ) : (
          <div className="dpcName">
            <p>{`Amenities: ${amenities}`}</p>
            <p>{`Address: ${address}`}</p>
          </div>
        )}
      </div>
      <div>
        <ReviewsModal id={id} finddpbi={finddpbi} reviews={reviews} />
      </div>

    </div>
  );
}

export default DogParkCard
    