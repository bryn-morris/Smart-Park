import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import MenuButton from './MenuButton';

function NavHead (props) {

    const { currentUser } = useContext(AuthContext)

    return(
        <div 
            className="Headcontainer"
            style={props.isActive ? {backgroundColor: '#212121'} : null}
        >
            <MenuButton {...props} />
            <div className="imgContainer">  
                <img 
                    src = {currentUser.image}
                    alt = "profile pic"
                    className='userAvatar'
                    style = {props.isActive ? {borderColor : "#212121"} : null}
                />
            </div>
        </div>
    )
}

export default NavHead