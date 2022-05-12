import ServerListInterface from "./server-list.interface";
import RxValue from "../../../rx-value/rx-value";
import {ServerListState} from "./server-list.state";
import RxIpcRenderer from "../../../rx-value-electron/rx-ipc-renderer";
import {ipcRenderer} from "electron";
import {AsyncUnit} from "../../../rx-value/async-unit";

export class ServerListController implements ServerListInterface {

    public shortenedList(): RxValue<ServerListState> {
        return RxIpcRenderer.getValue<ServerListState>("ServerListController::shortenedList");
    }

    public switchServer(id: number): AsyncUnit {
        return ipcRenderer.invoke("ServerListController::switchServer", id);
    }

}
