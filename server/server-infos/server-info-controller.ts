import ServerInfoRepo from "./server-info-repo";
import ServerInfo from "./server-info";
import {ipcMain} from "electron";

class ServerInfoController {

    private readonly repo = new ServerInfoRepo();

    public async currentServer(): Promise<ServerInfo> {
        const currentServerId = await this.getCurrentServer();
        const allServers = await this.getAllServers();
        return allServers.find(s => s.id === currentServerId);
    }

    public async getShortenedList(): Promise<ServerInfo[]> {
        const currentServerId = await this.getCurrentServer();
        const allServers = await this.getAllServers();
        return allServers.filter(s => s.id !== currentServerId);
    }

    public switchServer(id: number): Promise<void> {
        return this.repo.switchServer(id);
    }

    private getCurrentServer(): Promise<number> {
        return this.repo.currentServerId();
    }

    private getAllServers(): Promise<ServerInfo[]> {
        return this.repo.allServers();
    }

}

const serverInfoController = new ServerInfoController();

ipcMain.handle("serverInfo:currentServer", () => serverInfoController.currentServer());
ipcMain.handle("serverInfo:shortenedList", () => serverInfoController.getShortenedList());
ipcMain.handle("serverInfo:switchServer", (_, id) => serverInfoController.switchServer(id));
