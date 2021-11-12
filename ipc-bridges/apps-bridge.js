const {ipcRenderer} = require("electron");

exports.create = async () => {
    await ipcRenderer.invoke("apps:create")
}
