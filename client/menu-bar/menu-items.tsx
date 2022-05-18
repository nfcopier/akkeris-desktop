import * as React from "react";
import MenuItem from "./menu-item";

export default class MenuItems extends React.Component {

    render(): JSX.Element {
        return <div className={"menu-items"}>
            <MenuItem title={"Pipelines"} link={"pipelines"} />
            <MenuItem title={"Apps"} link={"apps"} />
        </div>;
    }
}
