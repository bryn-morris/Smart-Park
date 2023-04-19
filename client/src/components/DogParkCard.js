import React, {useState} from "react";

function DogParkCard({name, address, amenities, rating, image}){
    const [showFront, setShowFront] = useState(true);

  const handleFlip = () => {
    setShowFront(!showFront);
  };

  return (
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
  );
}

export default DogParkCard

    