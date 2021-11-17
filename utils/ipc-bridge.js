const {ipcRenderer, contextBridge} = require("electron");

contextBridge.exposeInMainWorld("ipc", (event, ...args) => {
    ipcRenderer.invoke(event, ...args)
});
