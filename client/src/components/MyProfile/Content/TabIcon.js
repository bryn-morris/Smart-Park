import {Icon} from "semantic-ui-react";

function TabIcon ({tabLabel, optionalStyling}) {

    let tabIconProp;
    switch(tabLabel) {
        case "parks":
            tabIconProp = "tree";
            break;
        case "badges":
            tabIconProp = "trophy";
            break;
        case "friends":
            tabIconProp = "users";
            break;
        case "pets":
            tabIconProp = "paw";
            break;
        default:
            break;
    }

    return(
        <Icon
            name = {tabIconProp}
            className="tabIcon"
            style = {optionalStyling}
        />
    )
}

export default TabIcon