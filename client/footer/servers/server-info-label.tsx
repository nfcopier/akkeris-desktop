import * as React from "react";
import LoadingText from "../../components/loading-text";
import ServerInfo from "../../../server/server-infos/server-info";
import {ipcRenderer} from "electron";

type ServerInfoProps = {
    onClick: () => void
}

const OFFLINE = "offline";

type ServerInfoState = typeof OFFLINE | ServerInfo

export default class ServerInfoLabel extends React.Component<ServerInfoProps, ServerInfoState> {

    public readonly state: ServerInfoState = OFFLINE;

    public componentDidMount(): void {
        ipcRenderer.invoke("serverInfo:currentServer").then(this.setState.bind(this));
    }

    render(): JSX.Element {
        if (this.state === OFFLINE) return <LoadingText />;
        return <div
            onClick={this.props.onClick}
            className={"server-info flat button"}
        >
            {this.state.nickname}
        </div>;
    }

}
