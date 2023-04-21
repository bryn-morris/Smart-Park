import {useState, useEffect} from 'react'
import { Button, Modal, Icon} from 'semantic-ui-react'
import CheckOutForm from './CheckOutForm'
import PawPrintIcons from './PawPrintIcons'

function Home({checkOut, startTimer,endTimer, handleFormSubmission, dogParks, deleteCheckIn, currentCheckInID, setAccidentalCheckin, accidentalCheckin, dogs}) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] =useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIcon(selectedIcon => (selectedIcon + 1) % 13);
    }, 600);
    return () => clearInterval(timer);
  }, []);
  
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

  const handleUserClose = () => {
    setIsModalOpen(false)
  }

  const accidentalCheckInMessage = 'Thanks for checking in :D ! If that checkin was a mistake you can delete below!'

  return (
    <div className='homePage'>
      <div className='homeHeader'>SmartPark</div>
      <PawPrintIcons selectedIcon={selectedIcon}/>
      {currentCheckInID ? <div className='checkedIn'>You're all checked in!</div> : null}
      {/* <img 
        src = 'https://images.unsplash.com/photo-1514373941175-0a141072bbc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80' 
        alt = 'Dog Playing with Ball'/> */}
      
      <div className="modalContainer">    
      {/* <div id = 'checkInFeature'>{currentCheckInID ? 'Check Out!' : 'Check In!'}</div>            */}
                
                <Modal
                    onClose={() => handleModalClose()}
                    onOpen={() => setIsModalOpen(true)}
                    open={isModalOpen}
                    trigger={
                              <Icon className = 'massive ui green dogPawIcon' name = 'paw'>
                                <div id = 'checkInFeature'>?</div>
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
                          <div>
                            <Button 
                              onClick={handleDeleteCheckIn}>
                                Cancel Check-In?
                            </Button>
                            {/* <Button
                              onClick={handleUserClose} 
                            >
                              Close
                            </Button> */}
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
                              onClick={handleUserClose} 
                            >
                              Close
                            </Button>
                        </Modal.Actions>}
                </Modal>

            </div>
    </div>
  )
}

export default Home