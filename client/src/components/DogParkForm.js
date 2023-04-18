import React, {useState} from 'react'
import { useHistory } from "react-router-dom";

function DogParkForm({ addDogParkState }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [rating, setRating] = useState("");
    const [amenities, setAmenities] = useState("");
    const [image, setImage] = useState("");
    let history = useHistory();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let newDogParkObj= {
        name: name,
        address: address,
        rating: rating,
        amenities: amenities,
        image: image,
      };
      fetch("http://localhost:4000/dogparks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDogParkObj),
      })
        .then((r) => r.json())
        .then(addDogParkState);
      e.target.reset();
      history.push("/dogparks");
    };
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Enter Name of Dog Park:
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>
                Enter Address:
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label>
                Enter Rating:
              </label>
              <input
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div>
              <label>
                Enter Amenities of Dog Park:
              </label>
              <textarea
                onChange={(e) => setAmenities(e.target.value)}
              />
            </div>
            <div>
              <label>
                Enter Image of Dog Park:
              </label>
              <input
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <button className="btn btn-primary btn-customized mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
    );
  }

export default DogParkForm