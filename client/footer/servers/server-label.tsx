import * as React from "react";
import OfflineText from "../../components/offline-text";
import ServerLabelState from "./server-label.state";
import ServerLabelProps from "./server-label.props";
import ServerLabelController from "./server-label.controller";
import RxComponent from "../../../rx-value-react/rx-component";
import RxValue from "../../../rx-value/rx-value";
import OFFLINE = ServerLabelState.OFFLINE;

export default class ServerLabel extends RxComponent<ServerLabelProps, ServerLabelState> {

    public readonly state: ServerLabelState = OFFLINE;
    private readonly controller = new ServerLabelController();

    protected override configureState(): RxValue<ServerLabelState> {
        return this.controller.label();
    }

    public render(): JSX.Element {
        if (this.state.isOffline) return <OfflineText />;
        return <div
            onClick={this.props.onClick}
            className={"server-info flat button"}
        >
            {this.state.nickname}
        </div>;
    }

}
