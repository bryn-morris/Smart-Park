import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import MenuButton from './MenuButton';

function NavHead (props) {

    const { currentUser } = useContext(AuthContext)

    const activeHeadStyling = {
        backgroundColor: props.isActive ? '#212121' : 'none',
    }

    return(
        <div 
            className="Headcontainer"
            style={activeHeadStyling}
        >
            <MenuButton {...props} />
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