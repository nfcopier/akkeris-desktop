import FullServerInfoState from "./full-server-info.state";
import RxIpcRenderer from "../../../rx-value-electron/rx-ipc-renderer";
import RxValue from "../../../rx-value/rx-value";

export default class FullServerInfoController {

    public info(): RxValue<FullServerInfoState> {
        return RxIpcRenderer.getValue("FullServerInfoController::info");
    }

}
