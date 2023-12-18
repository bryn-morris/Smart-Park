import MenuElement from "./MenuElement"
import NavDivider from "./NavDivider"
import MenuIcon from "./MenuIcon"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { CheckInContext } from "../../context/CheckInContext"

function NavMenu({isActive, toggleButton}){

    const menuLabels = ["Home","Profile","Settings"]
    const menuIcons = ["paw", "log out"]

    const {setIsLogOutModalRendered} = useContext(AuthContext)
    const {setIsModalOpen} = useContext(CheckInContext)

    function generateMenuItems (menuLabelsList) {
        return menuLabelsList.map((eachLabel)=>{
            
            let navRoute;

            switch (eachLabel) {
                case 'Home': {
                    navRoute = '/'
                    break;
                }
                case 'Profile': {
                    navRoute = '/profile/parks'
                    break;
                }
                case 'Settings': {
                    navRoute = '/settings'
                    break;
                }
                default:
                    navRoute = () => alert('No Matching Route Label Found!')
            }

            return(
                <MenuElement
                    key = {eachLabel}
                    navRoute = {navRoute} 
                    labelText={eachLabel}
                    toggleButton = {toggleButton}
                />
            )
        })
    }

    function generateIconItems (menuIconsList) {
        return menuIconsList.map((eachIconString)=>{
            
            let passFunc;

            switch (eachIconString) {
                case 'log out':
                    passFunc = () => {
                        setIsLogOutModalRendered(true)
                        toggleButton(false)
                    }
                    break;
                case 'paw':
                    passFunc = () => {
                        setIsModalOpen(true)
                        toggleButton(false)
                    }
                    break;
                default:
                    passFunc = () => alert('No Matching Icon Found!')
            }
            
            return(
            
            <MenuIcon
                key={eachIconString}
                labelIconString = {eachIconString}
                listCount = {menuIconsList.length}
                onClickFunction={passFunc}
            />
        )})
    }

    return (
        <div className={`Menu ${isActive ? "active" : ""}`}>
            <NavDivider optionalStyling={{height : '.3vh'}}/>
            <div className="iconMenu">
                {generateIconItems(menuIcons)}
            </div>
            <div className="routingMenu">
                <NavDivider optionalStyling={{height : '.3vh'}}/>
                    {generateMenuItems(menuLabels)}
                <NavDivider/>
            </div>
        </div>
    )
}

export default NavMenu