import RxValue from "../rx-value/rx-value";
import {ipcMain} from "electron";

export default class RxIpcMain {

    public static handle(functionName: string, callback: (args: any) => RxValue<any>): void {
        ipcMain.handle(functionName, (event, args: any) => {
            const channelId = functionName + '-' + Math.random();
            setTimeout(() => {
                const sub = callback(args).asObservable().subscribe(
                    value => event.sender.send(channelId, value)
                );
                ipcMain.once(channelId + ":unsubscribe", () => sub.unsubscribe());
            });
            return channelId.toString();
        });
    }

}
