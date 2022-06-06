import * as React from "react";
import FullServerInfo from "./full-server-info";
import ServerList from "./server-list";

export default class ServerDropup extends React.Component<{}, {}> {

    render(): JSX.Element {
        return <div className={"dropup left"}>
            <FullServerInfo />
            <hr />
            <ServerList />
        </div>;
    }

}
