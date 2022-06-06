import ServerListInterface from "./server-list.interface";
import ServerInfoRepo from "./server-info-repo";
import {AsyncUnit, RxValue, Val} from "rx-value";
import {ServerListState} from "./server-list.state";
import {RxIpcMain} from "rx-value-electron";
import {ipcMain} from "electron";

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
