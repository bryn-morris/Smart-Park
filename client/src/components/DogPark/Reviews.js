function Reviews({name, comment, rating}) {

    return (
    <div>
        <h1>------------------------------------------------------------------</h1>
        <br></br>
        <h2>{name}</h2>
        <h3>{comment}</h3>
        <h1>⭐ {rating} Stars ⭐</h1>
        <h1>------------------------------------------------------------------</h1>
    </div>
    )
  }
  
export default Reviews