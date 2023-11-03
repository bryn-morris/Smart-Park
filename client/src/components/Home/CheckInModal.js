import { Button, Modal } from "semantic-ui-react"
import { useState, useContext } from "react"
import CheckOutForm from "./CheckOutForm"
import { CheckInContext } from "../../context/CheckInContext"
import CheckInButton from "./CheckInButton"

function CheckInModal () {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const {
        currentCheckInID,
        accidentalCheckin,
        handleCheckInFormSubmission,
        startTimer,
        setAccidentalCheckin,
        deleteCheckIn,
        endTimer,
        checkOut,
    } = useContext(CheckInContext)

    const accidentalCheckInMessage = 'Thanks for checking in :D ! If that checkin was a mistake you can delete below!'

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

    return(
        <div className="checkInmodalContainer">    
        {/* <div id = 'checkInFeature'>{currentCheckInID ? 'Check Out!' : 'Check In!'}</div>            */}
                  
                  <Modal
                      onClose={() => handleModalClose()}
                      onOpen={() => setIsModalOpen(true)}
                      open={isModalOpen}
                      trigger={<div><CheckInButton /></div>}
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
                              handleFormSubmission = {handleCheckInFormSubmission}
                            />
                            }
                        </Modal.Content>
                      }
                      {currentCheckInID ?
                        <Modal.Actions>
                          {accidentalCheckin ?
                            <div>
                              <Button 
                                onClick={handleDeleteCheckIn}>
                                  Cancel Check-In?
                              </Button>
                            </div>
                            :
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
                              <Button
                                onClick={()=>setIsModalOpen(false)} 
                              >
                                Close
                              </Button>
                          </Modal.Actions>}
                  </Modal>
  
              </div>
    )
}

export default CheckInModal

