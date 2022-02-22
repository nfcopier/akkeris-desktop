import EnvironmentVariables from "./environment-variables";
import * as React from "react";
import {ipcRenderer} from "electron";

export default class Index extends React.Component {

    render(): JSX.Element {
        return <>
            <EnvironmentVariables />
            <button onClick={onButtonClick}>Click me!</button>
        </>
    }
}

const onButtonClick = () => ipcRenderer.invoke("token:add");
