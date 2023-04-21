
function SearchDogPark ({specificPark}) {
    
    return(
        <div class="ui large search" style={{float:'right', margin:20}}>
            <div class="ui icon input">
                    <input
                    class="prompt"
                    type="text"
                    placeholder="Search dog park name..."
                    onChange={(e) => specificPark(e.target.value)}
                    />
                    <i class="search icon"></i>
            </div>
        </div>
    )
}

export default SearchDogPark