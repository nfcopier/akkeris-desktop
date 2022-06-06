import {RxValue} from "rx-value";
import {RxIpcRenderer} from "rx-value-electron";
import ServerLabelState from "./server-label.state";

export default class ServerLabelController {

    public label(): RxValue<ServerLabelState> {
        return RxIpcRenderer.getValue("ServerLabelController::label");
    }

}
