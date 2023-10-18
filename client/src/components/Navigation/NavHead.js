import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import MenuButton from './MenuButton';

function NavHead () {

    const { currentUser } = useContext(AuthContext) 

    return(
        <div className="Headcontainer">
            <MenuButton />
            <div className="imgContainer">
                <img 
                    src = {currentUser.image}
                    alt = "profile pic"
                    className='userAvatar'
                />
            </div>
        </div>
    )
}

export default NavHead