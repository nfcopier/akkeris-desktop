const {app, BrowserWindow} = require("electron");
const path = require("path");

require("./server/apps-controller.js");

const start = async () => {
    await app.whenReady();
    await openWindow();
    app.on("activate", reopenWindow);
    app.on("window-all-closed", quitApp);
};

const openWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "utils/ipc-bridge.js")
        }
    });
    return mainWindow.loadFile(path.join(__dirname, "client/index.html"));
};

const reopenWindow = () => {
    if (BrowserWindow.getAllWindows().length === 0)
        return openWindow();
};

const quitApp = () => {
    if (process.platform !== 'darwin') app.quit();
};

start().then(() => {});
