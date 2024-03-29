
function NavDivider ({optionalStyling}) {

    const dividerStyling = {
        height: '0.11vh',
        width: '100%', 
        backgroundColor: '#E5E7E6',
        ...optionalStyling
    }

    return(
        <div style = {dividerStyling} />
    )
}

export default NavDivider