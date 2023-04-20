
function SearchDogPark ({specificPark}) {
    
    return(
        <div>
            <label htmlFor="search">Search Dog Parks:</label>
                <input
                type="text"
                placeholder="Type a Dog Park name to search..."
                onChange={(e) => specificPark(e.target.value)}
                />
        </div>
    )
}

export default SearchDogPark