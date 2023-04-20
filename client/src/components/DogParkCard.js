import React, {useState} from "react";

function DogParkCard({id, name, address, amenities, rating, image, handleParkSelection, addNewReview}){
  const [showFront, setShowFront] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false)

  const[usersName, setUsersName] = useState('')
  const[comment, setComment] = useState('')
  const[newRating, setNewRating] = useState(0)
  const[dogPark, setDogPark] = useState('')
  const handleUsersName = e => setUsersName(e.target.value)
  const handleComment = e => setComment(e.target.value)
  const handleNewRating = e => setNewRating(e.target.value)

  //flip cards
  const handleFlip = () => {
      setShowFront(!showFront);
    };
  
  //get id to show specific dog park reviews
  const handleParkClick = () =>{
      handleParkSelection(id)
    }
  
  //show&hide review form and get id for specific dog park
  const handleShowReviewForm = () =>{
      setShowReviewForm(!showReviewForm)
      setDogPark(id)
    }
  
  //post request for new review
  const handleSubmit = (e) => {
    e.preventDefault()

    const newReview = {
      name: usersName,
      comment: comment,
      rating: newRating,
      dog_park_id: dogPark
    }

    fetch("http://127.0.0.1:5555/reviews", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview)
        })
      .then(r=>r.json())
      .then(review => addNewReview(review))

    setUsersName('')
    setComment('')
    setNewRating('')
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
        <div>
            {showReviewForm ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <input type="text" value={usersName} onChange={handleUsersName}/>
                    <input type="text" value={comment} onChange={handleComment}/>
                    <input type="text" value={newRating} onChange={handleNewRating}/>
                    <button>Submit</button>
                  </form>
                  <button onClick={handleShowReviewForm}>Hide Form</button>
                </div>
                ) : (
                <button onClick={handleShowReviewForm}>Add Review</button>
                )
            }
        </div>
    </div>
  );
}

export default DogParkCard

    