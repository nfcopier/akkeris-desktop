import * as React from "react";
import ServerLabel from "./server-label";
import ServerDropup from "./server-dropup";
import ServerInfoParentState from "./server-info-parent.state";

export default class ServerInfoParent extends React.Component<{}, ServerInfoParentState>{

    public readonly state: ServerInfoParentState = {isOpen: false};

    render(): JSX.Element {
        return <div className={"dropdown-parent"}>
            <ServerLabel onClick={() => this.toggleOpen()} />
            {this.state.isOpen && <ServerDropup />}
        </div>;
    }

    toggleOpen(): void {
        this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }

}
