import ServerInfo from "./server-info";
import {RxValue, RxList} from "rx-value";
import {Subject, of} from "rxjs";
import {concatWith} from "rxjs/operators"

export default class ServerInfoRepo {

    private currentId: Subject<number> = new Subject<number>();

    public currentServerId(): RxValue<number> {
        const source = of(0).pipe(concatWith(this.currentId.asObservable()))
        return new RxValue(source);
    }

    public allServers(): RxList<ServerInfo> {
        return RxList.ofValues([{
            id: 0,
            nickname: "O.C. Tanner",
            hostname: "https://apps.octanner.io",
            token: "test token"
        }, {
            id: 1,
            nickname: "Other 1",
            hostname: "server1.test.com",
            token: "test token 1"
        }, {
            id: 2,
            nickname: "Other 2",
            hostname: "server2.test.com",
            token: "test token 2"
        }, {
            id: 3,
            nickname: "Other 3",
            hostname: "server3.test.com",
            token: "test token 3"
        }, {
            id: 4,
            nickname: "Other 4",
            hostname: "server4.test.com",
            token: "test token 4"
        }]);
    }

    public switchServer(id: number): Promise<void> {
        this.currentId.next(id);
        return Promise.resolve();
    }

    public add(serverInfo: ServerInfo): Promise<void> {
        return Promise.resolve();
    }

    public update(serverInfo: ServerInfo): Promise<void> {
        return Promise.resolve();
    }
}
