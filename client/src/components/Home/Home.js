import {useState, useEffect} from 'react'
import PawPrintIcons from './PawPrintIcons'
import CheckInButton from '../CheckIn/CheckInButton'
import { useContext } from 'react'
import { CheckInContext } from '../../context/CheckInContext'
import HomeSearch from './HomeSearch'

function Home() {

  const [selectedIcon, setSelectedIcon] =useState(1)
  const { currentCheckInID, setIsModalOpen } = useContext(CheckInContext)


  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIcon(selectedIcon => (selectedIcon + 1) % 13);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='home'>
      <div className='home Header'>Smart Park</div>
      {/* <PawPrintIcons selectedIcon={selectedIcon}/> */}
      {
        currentCheckInID ? 
        <div className='checkInText'>
          You're all checked in!
        </div> : 
        null
      }
      <div 
        className="checkInModalContainer"
        onClick = {()=>setIsModalOpen(true)}
      >
        <CheckInButton/>
      </div>
      <HomeSearch />
    </div>
  )
}

export default Home