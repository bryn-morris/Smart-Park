

function MenuElement ({labelText}) {

    return(
        <div className="menuElement">
            <div className="spacer" />
            <div className = "text">
                {labelText}
            </div>

        </div>
    )
}

export default MenuElement