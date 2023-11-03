import { Button, Modal } from "semantic-ui-react"
import { useState, useContext } from "react"
import CheckOutForm from "./CheckOutForm"
import { CheckInContext } from "../../../context/CheckInContext"
import CheckInButton from "./CheckInButton"

function CheckInModal () {

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const {
        currentCheckInID,
        accidentalCheckin,
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
        <div className="checkInModalContainer">                      
          <Modal
              onClose={() => handleModalClose()}
              onOpen={() => setIsModalOpen(true)}
              open={isModalOpen}
              trigger={<div><CheckInButton/></div>}
              size= 'small'
          >
          <Modal.Header>{currentCheckInID && accidentalCheckin === false ? 'Let\'s Check Out!' : 'Let\'s Check in!'}</Modal.Header>
              {currentCheckInID && accidentalCheckin === false ?
                <Modal.Content>
                  <Button
                    onClick={handleCheckOut}
                    content="Want to Check Out?"
                  />
                </Modal.Content> :
                <Modal.Content>
                    {accidentalCheckin ? 
                    accidentalCheckInMessage:
                    <CheckOutForm/>}
                </Modal.Content>
              }
              {currentCheckInID ?
                <Modal.Actions>
                  {accidentalCheckin ?
                    <div>
                      <Button 
                        onClick={handleDeleteCheckIn}
                        content = "Cancel Check-In?"
                      />
                    </div>
                    :
                    null}
                </Modal.Actions>:
                <Modal.Actions>
                  <Button
                    form="checkInForm" 
                    type="submit"
                    onClick={startTimer} 
                    content = "Submit"
                  />
                  <Button 
                    onClick={()=>setIsModalOpen(false)}
                    content = "Close"
                  />
                </Modal.Actions>}
          </Modal>

        </div>
    )
}

export default CheckInModal

