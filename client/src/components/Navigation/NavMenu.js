import MenuElement from "./MenuElement"
import NavDivider from "./NavDivider"
import MenuIcon from "./MenuIcon"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function NavMenu({isActive, toggleButton}){

    const menuLabels = ["Profile","Checkout"]
    const menuIcons = ["logout", "settings"]

    const {setIsLogOutModalRendered} = useContext(AuthContext)

    // Menu Icons are going to need a new component similar to head
    // Instead of having lougout text and settings text
    // have a subdivided menu towards the top that just contains
    // a settings icon and a logout icon that sits at the bottom of the menu
    // highlight when you hover over them and have a tooltip

    // function generateMenuItems (menuLabelsList) {
    //     menuLabels.map((eachLabel)=>{return(
    //         <div>

    //         </div>
    //     )})
    // }

    function generateIconItems (menuIconsList) {
        return menuIconsList.map((eachIconString)=>{
            
            let passFunc;

            switch (eachIconString) {
                case 'logout':
                    passFunc = () => setIsLogOutModalRendered(true)
                    // passFunc = () => console.log('testing')
                    break;
                case 'settings':
                    passFunc = () => console.log('settings')
                    break;
                default:
                    passFunc = () => alert('No Matching Icon Found!')
            }
            
            return(
            // write switch/case statement reading the value of menuIcons list
            // and passing a different prop as an on click function to MenuIcon
            // based on the value of eachIconString
            
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
            <NavDivider />
            <div className="iconMenu">
                {generateIconItems(menuIcons)}
            </div>
            <NavDivider />
            <div className="routingMenu">
                {/* {generateMenuItems(menuLabels)} */}
            </div>
            
        </div>
    )
}

export default NavMenu