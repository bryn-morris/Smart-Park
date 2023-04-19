import React, {useState} from "react";

function DogParkCard({id, name, address, amenities, rating, image, handleParkSelection}){
  const [showFront, setShowFront] = useState(true);

  const handleFlip = () => {
    setShowFront(!showFront);
  };
  
  const handleParkClick = () =>{
    handleParkSelection(id)
  }

  return (
    <div >
        <div onClick={handleFlip}>
          <h1>{name}</h1>
            {showFront ? (
                <img src={image} alt={name} />
            ) : (
                <p>{`Amenities: ${amenities}`}</p>
            )}
            <p>
              {showFront ? `Rating: ${rating}` : `Address: ${address}`}
            </p>
        </div>
        <div>
          <button onClick={handleParkClick}>Reviews</button>
        </div>
    </div>
  );
}

export default DogParkCard

    