import * as React from "react";
import ServerInfo from "../../../server/server-infos/server-info";
import {ipcRenderer} from "electron";

export default class ServerList extends React.Component<{}, ServerInfo[]> {

    public state: ServerInfo[] = [];

    public componentDidMount(): void {
        ipcRenderer.on("serverInfo:shortenedList", (_, r) => this.setState(r));
    }

    render(): JSX.Element {
        return <div className={"server-list"}>
            {this.state.map(this.serverItem.bind(this))}
        </div>;
    }

    private serverItem(info: ServerInfo) {
        return <div onClick={() => this.switchServer(info.id)}>{info.nickname}</div>;
    }

    private switchServer(id: number) {
        ipcRenderer.invoke("serverInfo:switchServer", id).then(() => {});
    }
}
