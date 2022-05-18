import RxValue from "../../../rx-value/rx-value";
import RxIpcRenderer from "../../../rx-value-electron/rx-ipc-renderer";
import ServerLabelState from "./server-label.state";

export default class ServerLabelController {

    public label(): RxValue<ServerLabelState> {
        return RxIpcRenderer.getValue("ServerLabelController::label");
    }

}
