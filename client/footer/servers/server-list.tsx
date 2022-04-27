import * as React from "react";
import ServerInfo from "../../../server/server-infos/server-info";
import {ipcRenderer} from "electron";

interface ServerInfoState {
    list: ServerInfo[]
}

export default class ServerList extends React.Component<{}, ServerInfoState> {

    public state: ServerInfoState = {list: []};

    public componentDidMount(): void {
        ipcRenderer.invoke("serverInfo:shortenedList").then(list => this.setState({list}));
    }

    render(): JSX.Element {
        console.log(this.state);
        return <div className={"server-list"}>
            {this.state.list.map(this.serverItem.bind(this))}
        </div>;
    }

    private serverItem(info: ServerInfo) {
        return <div onClick={() => this.switchServer(info.id)}>{info.nickname}</div>;
    }

    private switchServer(id: number) {
        ipcRenderer.invoke("serverInfo:switchServer", id).then(() => {});
    }
}
