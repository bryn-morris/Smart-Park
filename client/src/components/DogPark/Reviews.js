function Reviews({review}) {

    return (
    <div>
        <h1>------------------------------------------------------------------</h1>
        <br/>
        <h2>{review.user.username}</h2>
        <h3>{review.comment}</h3>
        <h1>⭐ {review.rating} Stars ⭐</h1>
        <h1>------------------------------------------------------------------</h1>
    </div>
    )
  }
  
export default Reviews