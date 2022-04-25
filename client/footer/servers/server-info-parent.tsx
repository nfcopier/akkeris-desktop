import * as React from "react";
import ServerInfoLabel from "./server-info-label";
import ServerDropup from "./server-dropup";

type ServerInfoState = {

    isOpen: Boolean

}

export default class ServerInfoParent extends React.Component<{}, ServerInfoState>{

    public readonly state: ServerInfoState = {isOpen: false};

    render(): JSX.Element {
        return <div className={"dropdown-parent"}>
            <ServerInfoLabel onClick={() => this.toggleOpen()} />
            {this.state.isOpen && <ServerDropup />}
        </div>;
    }

    toggleOpen(): void {
        this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }

}
