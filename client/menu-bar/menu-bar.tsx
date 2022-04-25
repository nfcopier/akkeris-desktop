import * as React from "react";
import MenuItems from "./menu-items";
import Settings from "./settings";

export default class MenuBar extends React.Component {

    render(): JSX.Element {
        return <div className={'menu-bar inverted-color'}>
            <MenuItems />
            <Settings />
        </div>
    }
}
