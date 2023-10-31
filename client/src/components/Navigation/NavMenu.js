import MenuElement from "./MenuElement"
import NavDivider from "./NavDivider"
import MenuIcon from "./MenuIcon"

function NavMenu({isActive, toggleButton}){

    const menuLabels = ["Profile","Checkout"]
    const menuIcons = ["logout", "settings"]

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
        return menuIconsList.map((eachIconString)=>{return(
            <MenuIcon 
                labelIconString = {eachIconString}
                listCount = {menuIconsList.length}
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