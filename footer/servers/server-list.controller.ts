import ServerListInterface from "./server-list.interface";
import {RxValue, AsyncUnit} from "rx-value";
import {ServerListState} from "./server-list.state";
import {RxIpcRenderer} from "rx-value-electron";
import {ipcRenderer} from "electron";

export class ServerListController implements ServerListInterface {

    public shortenedList(): RxValue<ServerListState> {
        return RxIpcRenderer.getValue<ServerListState>("ServerListController::shortenedList");
    }

    public switchServer(id: number): AsyncUnit {
        return ipcRenderer.invoke("ServerListController::switchServer", id);
    }

}
