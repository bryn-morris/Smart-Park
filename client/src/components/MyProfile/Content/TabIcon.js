import {Icon} from "semantic-ui-react";

function TabIcon ({tabLabel}) {

    console.log(tabLabel)

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

    console.log(tabIconProp)

    return(
        <Icon
            name = {tabIconProp}
            className="tabIcon"
        />
    )
}

export default TabIcon