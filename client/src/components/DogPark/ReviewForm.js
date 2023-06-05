import {useState} from "react";
import {Form} from 'semantic-ui-react'


function ReviewForm ({handleAddReview}) {

    const emptyFormObj = {
        comment: '',
        rating : '',
    }

    const [formObject, setFormObject] = useState(emptyFormObj)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleAddReview(formObject)
        setFormObject(emptyFormObj)
    }

    const handleFormInputChange = (e) => {
        setFormObject(
            ()=>{return{...formObject, [e.target.name]: e.target.value}}
        )
    }

    return (
    <div>
        <Form id = "reviewForm" onSubmit={handleFormSubmit}>
            <br/>
            <label>Comment:</label>
            <input type="text" name = "comment" value={formObject.comment} onChange={handleFormInputChange} placeholder = 'comment'/>
            <br/>
            <label>Rating:</label>
            <input type="text" name = "rating" value={formObject.rating} onChange={handleFormInputChange} placeholder = "rating 1-5"/>
            <br/>
        </Form>
    </div>
    )
}

export default ReviewForm
        
        
        