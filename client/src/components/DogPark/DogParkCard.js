import React, {useState} from "react";

import ReviewModal from '../ReviewsModal'

function DogParkCard({id, name, address, amenities, rating, image, reviews, finddpbi}){
  const [showFront, setShowFront] = useState(true);

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  return (
    <div >
        <div onClick={handleFlip}>
          <h1>{name}</h1>
            {showFront ? (
              <div>
                <img src={image} alt={name} />
                {`Rating: ${rating}`}
              </div>
            ) : (
                <div>
                  <p>{`Amenities: ${amenities}`}</p>
                  <p>{`Address: ${address}`}</p>
                </div>
            )}
        </div>
        <div>
          <ReviewModal id = {id} finddpbi = {finddpbi}  reviews={reviews}/>
            {/* {showReviews ? (
              <div>
                {reviewComponents()}
                <button onClick={handleShowReviews}>Hide Reviews</button>
              </div>
            ):(
              <button onClick={handleShowReviews}>Reviews</button>
            )} */}
        </div>
        
    </div>
  );
}

export default DogParkCard

    