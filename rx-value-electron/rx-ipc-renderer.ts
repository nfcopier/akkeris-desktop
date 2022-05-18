import {ipcRenderer} from "electron";
import RxValue from "../rx-value/rx-value";
import {from, fromEventPattern, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import RxList from "../rx-value/rx-list";

class Invocation<T> {

    private readonly functionName: string;
    private readonly args: any[];

    public constructor(functionName: string, args: any[]) {
        this.functionName = functionName;
        this.args = args;
    }

    public establishConnection(): Observable<T> {
        return this.invokeInner().pipe(
            switchMap(this.listenForMessages)
        );
    }

    private invokeInner() {
        return from(ipcRenderer.invoke(this.functionName, ...this.args));
    }

    private listenForMessages(channel: string): Observable<T> {
        return fromEventPattern(
            h => ipcRenderer.on(channel, (_, v) => h(v)),
            () => {
                ipcRenderer.send(channel + ":unsubscribe");
                ipcRenderer.removeAllListeners(channel);
            }
        ) as Observable<T>;
    }

}

export default class RxIpcRenderer {

    public static getValue<T>(functionName: string, ...args: any[]): RxValue<T> {
        const invocation = new Invocation<T>(functionName, args);
        const source = invocation.establishConnection();
        return new RxValue(source);
    }

    public static getList<T>(functionName: string, ...args: any[]): RxList<T> {
        const invocation = new Invocation<T[]>(functionName, args);
        const source = invocation.establishConnection();
        return new RxList(source);
    }
}
