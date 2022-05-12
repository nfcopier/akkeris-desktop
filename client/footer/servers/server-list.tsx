import * as React from "react";
import RxValue from "../../../rx-value/rx-value";
import RxComponent from "../../../rx-value-react/rx-component";
import {ServerItemModel, ServerListState} from "./server-list.state";
import {ServerListController} from "./server-list.controller";

export default class ServerList extends RxComponent<{}, ServerListState> {

    public state: ServerListState = {list: []};
    private readonly controller = new ServerListController();

    protected override configureState(): RxValue<ServerListState> {
        return this.controller.shortenedList();
    }

    public render(): JSX.Element {
        return <div className={"server-list"}>
            {this.state.list.map(this.serverItem.bind(this))}
        </div>;
    }

    private serverItem(info: ServerItemModel): JSX.Element {
        return <div
            key={info.id}
            className={"flat button"}
            onClick={() => this.controller.switchServer(info.id)}
        >
            {info.nickname}
        </div>;
    }

}
