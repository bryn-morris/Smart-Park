import MenuElement from "./MenuElement"
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
            
            <div className="iconMenu">
                {generateIconItems(menuIcons)}
            </div>
            <div style = {{height: '0.11vh', backgroundColor: '#E5E7E6',}} />
            <div className="routingMenu">
                {/* {generateMenuItems(menuLabels)} */}
            </div>
            
        </div>
    )
}

export default NavMenu