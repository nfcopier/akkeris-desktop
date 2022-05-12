import ServerInfoRepo from "./server-info-repo";
import RxValue from "../../rx-value/rx-value";
import RxIpcMain from "../../rx-value-electron/rx-ipc-main";
import ServerLabelState from "../../client/footer/servers/server-label.state";
import Val from "../../rx-value/val";

class ServerLabelController {

    private readonly repo = new ServerInfoRepo();

    public label(): RxValue<ServerLabelState> {
        const currentServerId = this.repo.currentServerId();
        const allServers = this.repo.allServers();
        const server = allServers.find(s => currentServerId.equals(s.id));
        return Val({
            isOffline: false,
            nickname: server.get("nickname")
        });
    }

}

const controller = new ServerLabelController();

RxIpcMain.handle("ServerLabelController::label", () => controller.label());
