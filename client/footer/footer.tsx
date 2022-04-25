import * as React from "react";
import ServerInfoParent from "./servers/server-info-parent";

export default class Footer extends React.Component{

    render(): JSX.Element {
        return <div className={"footer inverted-color"}>
            <ServerInfoParent />
        </div>;
    }

}
