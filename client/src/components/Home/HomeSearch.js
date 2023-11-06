import { Search } from "semantic-ui-react"

function HomeSearch () {
    return(
        <div className="SearchContainer">
            <Search
                className="Bar"
                placeholder="Search for Dog Parks or other Users Here!"
            />
        </div>
    )
}

export default HomeSearch