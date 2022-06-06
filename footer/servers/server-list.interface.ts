import {RxValue, AsyncUnit} from "rx-value";
import {ServerListState} from "./server-list.state";

export default interface ServerListInterface {

    shortenedList(): RxValue<ServerListState>;

    switchServer(id: number): AsyncUnit;

}
