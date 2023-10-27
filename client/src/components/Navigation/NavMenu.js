import MenuElement from "./MenuElement"

function NavMenu({isActive, toggleButton}){

    return (
        <div className={`Menu ${isActive ? "active" : ""}`}>

        </div>
    )
}

export default NavMenu