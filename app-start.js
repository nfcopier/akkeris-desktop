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
            preload: path.join(__dirname, "ipc-bridges/main-bridge.js")
        }
    });
    return mainWindow.loadFile("client/index.html");
};

const reopenWindow = () => {
    if (BrowserWindow.getAllWindows().length === 0)
        return openWindow();
};

const quitApp = () => {
    if (process.platform !== 'darwin') app.quit();
};

start().then(() => {});
