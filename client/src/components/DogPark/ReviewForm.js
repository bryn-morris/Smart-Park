import {useState} from "react";
import {Form, Input} from 'semantic-ui-react'


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
        <Form id = "reviewForm" onSubmit={handleFormSubmit}>
            <br/>
            <label>Comment:</label>
            <Input 
                type="text" 
                name = "comment" 
                value={formObject.comment} 
                onChange={handleFormInputChange} 
                placeholder = 'comment'
            />
            <br/>
            <label>Rating:</label>
            <Input 
                type="number" 
                name = "rating" 
                value={formObject.rating} 
                onChange={handleFormInputChange} 
                placeholder = "rating"
                min = '1'
                max = '5'
            />
            <br/>
        </Form>
    )
}

export default ReviewForm
        
        
        