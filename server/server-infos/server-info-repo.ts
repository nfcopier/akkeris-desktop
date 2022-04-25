import ServerInfo from "./server-info";

export default class ServerInfoRepo {

    private currentId: number = 0;

    public currentServerId(): Promise<number> {
        return Promise.resolve(this.currentId);
    }

    public allServers(): Promise<ServerInfo[]> {
        return Promise.resolve([{
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
        this.currentId = id;
        return Promise.resolve();
    }

    public add(serverInfo: ServerInfo): Promise<void> {
        return Promise.resolve();
    }

    public update(serverInfo: ServerInfo): Promise<void> {
        return Promise.resolve();
    }
}
