import * as React from "react";
import RedactedText from "../../components/redacted-text";
import OfflineText from "../../components/offline-text";
import FullServerInfoState from "./full-server-info.state";
import FullServerInfoController from "./full-server-info.controller";
import RxComponent from "../../../rx-value-react/rx-component";
import RxValue from "../../../rx-value/rx-value";
import OFFLINE = FullServerInfoState.OFFLINE;

export default class FullServerInfo extends RxComponent<{}, FullServerInfoState> {

    public state: FullServerInfoState = OFFLINE;
    private readonly controller = new FullServerInfoController();

    protected override configureState(): RxValue<FullServerInfoState> {
        return this.controller.info();
    }

    render(): JSX.Element {
        console.log(this.state);
        if (this.state.isOffline) return <OfflineText />;
        return <div className={"full-server-info"}>
            <div>{this.state.nickname}</div>
            <div>{this.state.hostname}</div>
            <RedactedText>{this.state.token}</RedactedText>
        </div>;
    }

}
