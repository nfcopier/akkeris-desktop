import {React} from "./libraries.js";
import {ipc} from "./libraries.js";

export default () => {
    return <button onClick={onButtonClick}>Click me!</button>
};

const onButtonClick = () => ipc("apps:create");
