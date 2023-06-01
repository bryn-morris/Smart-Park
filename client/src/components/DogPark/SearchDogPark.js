
function SearchDogPark ({specificPark}) {
    
    return(
        <div className="ui large search" style={{float:'right', margin:20}}>
            <div className="ui icon input">
                    <input
                    className="prompt"
                    type="text"
                    placeholder="Search dog park name..."
                    onChange={(e) => specificPark(e.target.value)}
                    />
                    <i className="search icon"></i>
            </div>
        </div>
    )
}

export default SearchDogPark