import { Button, Modal } from "semantic-ui-react"
import { useContext } from "react"
import CheckOutForm from "./CheckOutForm"
import { CheckInContext } from "../../context/CheckInContext"

function CheckInModal () {
    
    const {
        checkInID,
        accidentalCheckin,
        setAccidentalCheckin,
        deleteCheckIn,
        checkOut,
        isModalOpen,
        setIsModalOpen,
    } = useContext(CheckInContext)

    const accidentalCheckInMessage = 'Thanks for checking in :D ! If that checkin was a mistake you can delete below!'

    const handleDeleteCheckIn = () => {
        setIsModalOpen(false)
        setAccidentalCheckin(false)
        deleteCheckIn()
      }
    
      const handleModalClose = () => {
        setIsModalOpen(false)
        setAccidentalCheckin(false)
      }
    
      const handleCheckOut = () => {
        setIsModalOpen(false)
        checkOut()
      }

    return(              
          <Modal
              onClose={() => handleModalClose()}
              onOpen={() => setIsModalOpen(true)}
              open={isModalOpen}
              size= 'small'
          >
          <Modal.Header>{checkInID && accidentalCheckin === false ? 'Let\'s Check Out!' : 'Let\'s Check in!'}</Modal.Header>
              {checkInID && accidentalCheckin === false ?
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
              {checkInID ?
                <Modal.Actions>
                  {accidentalCheckin ?
                    <div>
                      <Button 
                        onClick={handleDeleteCheckIn}
                        content = "Cancel Check-In?"
                      />
                      <Button
                        onClick = {handleModalClose}
                        content = {"Confirm Check-In"}
                      />
                    </div>
                    :
                    null}
                </Modal.Actions>:
                <Modal.Actions>
                  <Button
                    form="checkInForm" 
                    type="submit"
                    content = "Submit"
                  />
                  <Button 
                    onClick={()=>setIsModalOpen(false)}
                    content = "Close"
                  />
                </Modal.Actions>}
          </Modal>
    )
}

export default CheckInModal

