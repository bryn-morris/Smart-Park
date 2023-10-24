function MenuButton ({isActive, toggleButton}) {

    return(
        <div className="menuButtonContainer">
            <div 
                className = {`navButton ${isActive ? 'active' :''}`}
                onClick={toggleButton}
            >
                <div className='icon-left'></div>
                <div className = 'icon-right'></div>
            </div>
        </div>
    )
}

export default MenuButton