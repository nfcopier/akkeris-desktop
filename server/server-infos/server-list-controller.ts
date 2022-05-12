import ServerListInterface from "../../client/footer/servers/server-list.interface";
import ServerInfoRepo from "./server-info-repo";
import RxValue from "../../rx-value/rx-value";
import {ServerListState} from "../../client/footer/servers/server-list.state";
import Val from "../../rx-value/val";
import RxIpcMain from "../../rx-value-electron/rx-ipc-main";
import {ipcMain} from "electron";
import {AsyncUnit} from "../../rx-value/async-unit";

class ServerListController implements ServerListInterface {

    private readonly repo = new ServerInfoRepo();

    public shortenedList(): RxValue<ServerListState> {
        const currentServerId = this.repo.currentServerId();
        const allServers = this.repo.allServers();
        const list = allServers.filter(s => currentServerId.notEquals(s.id))
        return Val({list});
    }

    public switchServer(id: number): AsyncUnit {
        return this.repo.switchServer(id);
    }

}

const controller = new ServerListController();

RxIpcMain.handle("ServerListController::shortenedList", () => controller.shortenedList());
ipcMain.handle("ServerListController::switchServer", (_, id) => controller.switchServer(id));
