

function Tab ({key, tabLabel, setSelectedTab}) {

 // if is selected is true for this tab, add class to change styling and render different content

    return(
        <div
            className="Tab" 
            onClick={setSelectedTab(key)}
        >
            <div className="Label"/>{tabLabel}
            <div className = "pointyBit"/>
        </div>
    )
}

export default Tab