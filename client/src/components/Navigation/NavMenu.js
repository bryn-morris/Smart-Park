import MenuElement from "./MenuElement"

function NavMenu({isActive, toggleButton}){

    const menuLabels = ["Profile","Checkout"]

    const menuIcons = ["Logout", "Settings"]
    // Instead of having lougout text and settings text
    // have a subdivided menu towards the top that just contains
    // a settings icon and a logout icon that 
    // highlight hwen you hover over them and have a tooltip

    function generateMenuItems (menuLabels) {


    }



    return (
        <div className={`Menu ${isActive ? "active" : ""}`}>
            {generateMenuItems()}
        </div>
    )
}

export default NavMenu