import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'

function NavHead () {

    const { currentUser } = useContext(AuthContext) 

    return(
        <div className="Headcontainer">
            <div className="hammenu">

            </div>
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