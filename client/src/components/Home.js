import {useState} from 'react'
import { Button, Modal} from 'semantic-ui-react'
import CheckOutForm from './CheckOutForm'

function Home({handleFormSubmission, dogParks}) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div>Smart Parks (Project Title)</div>
      <img 
        src = 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80' 
        alt = 'Dog Playing with Ball'/>
      <div className="modalContainer">    
                 
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onOpen={() => setIsModalOpen(true)}
                    open={isModalOpen}
                    trigger={<Button className = "big ui button modalbutton">Check in!</Button>}
                    size= 'small'
                >
                <Modal.Header>Let's Check In!</Modal.Header>
                    <Modal.Content>
                        <CheckOutForm 
                          setIsModalOpen = {setIsModalOpen} 
                          handleFormSubmission = {handleFormSubmission}
                          dogParks = {dogParks}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            form="checkInForm" 
                            type="submit" 
                        >
                            Submit
                        </Button>
                    </Modal.Actions> 
                </Modal>
                
            </div>
    </div>
  )
}

export default Home