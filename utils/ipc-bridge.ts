const {ipcRenderer, contextBridge} = require("electron");

contextBridge.exposeInMainWorld("ipc", (event: String, ...args: any[]) => {
    ipcRenderer.invoke(event, ...args)
});
