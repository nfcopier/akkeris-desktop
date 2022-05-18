import {EnvVarType} from "./env-var-type";
import AddonSummary from "./addon-summary";

export default interface EnvVarNote {

    type: EnvVarType;

    addon: AddonSummary;
}
