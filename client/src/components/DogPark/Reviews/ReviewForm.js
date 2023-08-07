import {useContext, useState} from "react";
import {Form, Input, TextArea} from 'semantic-ui-react'
import { ReviewContext } from "../../../context/ReviewContext";

function ReviewForm ({ dogParkID, setAddReviewDisabled}) {

    const emptyFormObj = {
        comment: '',
        rating : '',
    }

    const [formObject, setFormObject] = useState(emptyFormObj)

    const {
        handleAddReview,
        isReviewFormRendered,
        setIsReviewFormRendered,
        setIsDPModalOpen,
    } = useContext(ReviewContext)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleAddReview(formObject, dogParkID, setAddReviewDisabled)
        setFormObject(emptyFormObj)
        if(isReviewFormRendered) {
            setIsReviewFormRendered(false)
            setIsDPModalOpen(false)
        }
        

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
            <TextArea 
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
        
        
        