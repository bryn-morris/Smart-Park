import { Button, Modal, Icon } from "semantic-ui-react"
import { useState, useContext } from "react"
import CheckOutForm from "./CheckOutForm"
import { CheckInContext } from "../../context/CheckInContext"

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
                      trigger={
                                <Icon className = 'massive ui green dogPawIcon1' name = 'paw'>
                                  <div id = 'checkInFeature1'>?</div>
                                  <div id = 'checkInFeature2'>?</div> 
                                  <div id = 'checkInFeature3'>!</div>
                                  <div id = 'checkInFeature4'>?</div> 
                                </Icon>
                                // <Button className = "massive ui icon modalbutton">
                                //   {currentCheckInID ? <Icon name = 'paw' content = 'Check Out!'/> : <Icon name = 'paw' content = 'Check in!'/> }
                                // </Button>
                                }
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

