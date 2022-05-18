import ServerInfoRepo from "./server-info-repo";
import RxValue from "../../rx-value/rx-value";
import RxIpcMain from "../../rx-value-electron/rx-ipc-main";
import FullServerInfoState from "../../client/footer/servers/full-server-info.state";
import Val from "../../rx-value/val";

class FullServerInfoController {

    private readonly repo = new ServerInfoRepo();

    public info(): RxValue<FullServerInfoState> {
        const currentServerId = this.repo.currentServerId();
        const allServers = this.repo.allServers();
        const info = allServers.find(s => currentServerId.equals(s.id));
        return Val({
            isOffline: false,
            nickname: info.get("nickname"),
            hostname: info.get("hostname"),
            token: info.get("token")
        });
    }

}

const controller = new FullServerInfoController();

RxIpcMain.handle("FullServerInfoController::info", () => controller.info());
