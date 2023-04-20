import React, {useState} from "react";
import Reviews from './Reviews'

function DogParkCard({id, name, address, amenities, rating, image, reviews, finddpbi}){
  const [showFront, setShowFront] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showReviews, setShowReviews]=useState(false)

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
  
  //show reviews on dog park card
  const handleShowReviews = () =>{
     setShowReviews(!showReviews)
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


    fetch("/reviews", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview)
        })
      .then(r=> r.ok? 
        r.json().then(review => finddpbi(review)):
        r.json().then(r => alert(r.message))
      )
  
    setUsersName('')
    setComment('')
    setNewRating('')
  }

  const reviewComponents = () => {
    if (reviews.length === 0) {
      return null
    } else {
      return (reviews.map(review => <Reviews key={review.id} {...review}/>))}
    }


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
            {showReviews ? (
              <div>
                {reviewComponents()}
                <button onClick={handleShowReviews}>Hide Reviews</button>
              </div>
            ):(
              <button onClick={handleShowReviews}>Reviews</button>
            )}
        </div>
        <div>
            {showReviewForm ? (
                <div>
                  <form onSubmit={handleSubmit}>
                    <input type="text" value={usersName} onChange={handleUsersName} placeholder='username'/>
                    <input type="text" value={comment} onChange={handleComment} placeholder = 'comment'/>
                    <input type="text" value={newRating} onChange={handleNewRating} placeholder = "rating 1-5"/>
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

    