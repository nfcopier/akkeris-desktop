import RxValue from "../../../rx-value/rx-value";
import {ServerListState} from "./server-list.state";
import {AsyncUnit} from "../../../rx-value/async-unit";

export default interface ServerListInterface {

    shortenedList(): RxValue<ServerListState>;

    switchServer(id: number): AsyncUnit;

}
