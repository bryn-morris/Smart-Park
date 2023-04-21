import {useState} from 'react'
import { Button, Modal} from 'semantic-ui-react'
import CheckOutForm from './CheckOutForm'

function Home({checkOut, startTimer,endTimer, handleFormSubmission, dogParks, deleteCheckIn, currentCheckInID, setAccidentalCheckin, accidentalCheckin, dogs}) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleDeleteCheckIn = () => {
    setIsModalOpen(false)
    setAccidentalCheckin(false)
    deleteCheckIn()
    endTimer()
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setAccidentalCheckin(false)
  }

  const handleCheckOut = () => {
    setIsModalOpen(false)
    checkOut()
    endTimer()
  }

  const accidentalCheckInMessage = 'Thanks for checking in :D ! If that checkin was a mistake you can delete below!'

  return (
    <div>
      <div className='homeHeader'>Smart Park</div>
      {currentCheckInID ? <div className='checkedIn'>You're all checked in!</div> : null}
      {/* <img 
        src = 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80' 
        alt = 'Dog Playing with Ball'/> */}
      <div className="modalContainer">    
                 
                <Modal
                    onClose={() => handleModalClose()}
                    onOpen={() => setIsModalOpen(true)}
                    open={isModalOpen}
                    trigger={<Button className = "massive ui button green modalbutton">{currentCheckInID ? 'Check Out!' : 'Check in!'}</Button>}
                    size= 'small'
                >
                <Modal.Header>{currentCheckInID && accidentalCheckin === false ? 'Let\'s Check Out!' : 'Let\'s Check in!'}</Modal.Header>
                    {currentCheckInID && accidentalCheckin === false ?
                      <Modal.Content>
                        <Button
                          onClick={handleCheckOut}
                        >
                          Want to Check Out?
                        </Button>
                      </Modal.Content> :
                      <Modal.Content>
                          {accidentalCheckin ? 
                          accidentalCheckInMessage:
                          <CheckOutForm
                            dogs={dogs}
                            handleFormSubmission = {handleFormSubmission}
                            dogParks = {dogParks}
                          />
                          }
                      </Modal.Content>
                    }
                    {currentCheckInID ?
                      <Modal.Actions>
                        {accidentalCheckin ? 
                          <Button 
                            onClick={handleDeleteCheckIn}>
                            Cancel Check-In?
                          </Button>:
                          null
                        }
                      </Modal.Actions>:
                      <Modal.Actions>
                            <Button
                              form="checkInForm" 
                              type="submit"
                              onClick={startTimer} 
                            >
                              Submit
                            </Button>
                        </Modal.Actions>}
                </Modal>

            </div>
    </div>
  )
}

export default Home