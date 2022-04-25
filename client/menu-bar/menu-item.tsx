import * as React from "react";

interface MenuItemProps {
    title: string
    link: string
}

export default class MenuItem extends React.Component<MenuItemProps> {

    render(): JSX.Element {
        return <a className={"menu-item flat button"} href={this.props.link}>{this.props.title}</a>;
    }
}
