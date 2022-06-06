import FullServerInfoState from "./full-server-info.state";
import {RxIpcRenderer} from "rx-value-electron";
import {RxValue} from "rx-value";

export default class FullServerInfoController {

    public info(): RxValue<FullServerInfoState> {
        return RxIpcRenderer.getValue("FullServerInfoController::info");
    }

}
