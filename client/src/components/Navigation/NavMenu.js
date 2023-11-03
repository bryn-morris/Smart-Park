import MenuElement from "./MenuElement"
import NavDivider from "./NavDivider"
import MenuIcon from "./MenuIcon"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function NavMenu({isActive, toggleButton}){

    const menuLabels = ["Home","Profile","Settings"]
    const menuIcons = ["paw", "log out"]

    const {setIsLogOutModalRendered} = useContext(AuthContext)

    // Menu Icons are going to need a new component similar to head
    // Instead of having lougout text and settings text
    // have a subdivided menu towards the top that just contains
    // a settings icon and a logout icon that sits at the bottom of the menu
    // highlight when you hover over them and have a tooltip

    function generateMenuItems (menuLabelsList) {
        return menuLabelsList.map((eachLabel)=>{
            
            let navRoute;

            switch (eachLabel) {
                case 'Home': {
                    navRoute = '/'
                    break;
                }
                case 'Profile': {
                    navRoute = '/profile'
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
                />
            )
        })
    }

    function generateIconItems (menuIconsList) {
        return menuIconsList.map((eachIconString)=>{
            
            let passFunc;

            switch (eachIconString) {
                case 'log out':
                    passFunc = () => setIsLogOutModalRendered(true)
                    // passFunc = () => console.log('testing')
                    break;
                case 'paw':
                    passFunc = () => console.log('checkout modal render')
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