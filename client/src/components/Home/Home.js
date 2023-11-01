import {useState, useEffect} from 'react'
import CheckInModal from './CheckInModal'
import PawPrintIcons from './PawPrintIcons'
import { useContext } from 'react'
import { CheckInContext } from '../../context/CheckInContext'

function Home() {

  const [selectedIcon, setSelectedIcon] =useState(1)
  const { currentCheckInID } = useContext(CheckInContext)

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIcon(selectedIcon => (selectedIcon + 1) % 13);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='home'>
      <div className='home Header'>SmartPark</div>
      <PawPrintIcons selectedIcon={selectedIcon}/>
      {currentCheckInID ? <div className='checkInText'>You're all checked in!</div> : null}
      <CheckInModal/>
    </div>
  )
}

export default Home