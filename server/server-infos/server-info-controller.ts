import ServerInfoRepo from "./server-info-repo";
import ServerInfo from "./server-info";
import {ipcMain} from "electron";
import {combineLatest, concatWith, from, map, Observable, Subject} from "rxjs";

class ServerInfoController {

    private currentServerId$: Subject<number> = new Subject();
    private serverList$: Subject<ServerInfo[]> = new Subject();

    private readonly repo = new ServerInfoRepo();

    public currentServer(): Observable<ServerInfo> {
        return combineLatest(
            this.getCurrentServer(),
            this.getAllServers()
        ).pipe(
            map(([id, servers]) => servers.find(s => s.id === id))
        );
    }

    public getShortenedList(): Observable<ServerInfo[]> {
        return combineLatest(
            this.getCurrentServer(),
            this.getAllServers()
        ).pipe(
            map(([id, servers]) => servers.filter(s => s.id !== id))
        );
    }

    public switchServer(id: number): Promise<void> {
        this.currentServerId$.next(id);
        return this.repo.switchServer(id);
    }

    private getCurrentServer(): Observable<number> {
        return from(
            this.repo.currentServerId()
        ).pipe(
            concatWith(this.currentServerId$)
        );
    }

    private getAllServers(): Observable<ServerInfo[]> {
        return from(
            this.repo.allServers()
        ).pipe(
            concatWith(this.serverList$)
        );
    }

}

const serverInfoController = new ServerInfoController();

ipcMain.handle("serverInfo:currentServer", () => serverInfoController.currentServer());
ipcMain.handle("serverInfo:shortenedList", () => serverInfoController.getShortenedList());
ipcMain.handle("serverInfo:switchServer", (_, id) => serverInfoController.switchServer(id));
