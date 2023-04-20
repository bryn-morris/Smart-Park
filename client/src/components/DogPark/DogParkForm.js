import React, {useState} from 'react'
import {Form} from 'semantic-ui-react'

function DogParkForm({handleAddDogPark}) {
    const [name, setName] = useState('');
    const [amenities, setAmenities] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState('');
    const [image, setImage] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('amenities', amenities);
        formData.append('address', address);
        formData.append('rating', rating);
        formData.append('image', image);
        
        handleAddDogPark(formData) 

        setName('')
        setAmenities('')
        setAddress('')
        setRating('')
        setImage('')
      }
  
    return (
      <Form id  = "dogParkForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Amenities:
          <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
      </Form>
    );
  }
export default DogParkForm