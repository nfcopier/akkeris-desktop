import * as React from "react";
import ServerInfo from "../../../server/server-infos/server-info";
import {ipcRenderer} from "electron";
import RedactedText from "../../components/redacted-text";

const OFFLINE = "offline";

type ServerInfoState = typeof OFFLINE | ServerInfo

export default class FullServerInfo extends React.Component<{}, ServerInfoState> {

    public state: ServerInfoState = OFFLINE;

    public componentDidMount(): void {
        ipcRenderer.on("serverInfo:currentServer", (_, r) => this.setState(r));
    }

    render(): JSX.Element {
        if (this.state === OFFLINE) return <>offline</>;
        return <div className={"full-server-info"}>
            <div>{this.state.nickname}</div>
            <div>{this.state.hostname}</div>
            <RedactedText>{this.state.token}</RedactedText>
        </div>;
    }

}
