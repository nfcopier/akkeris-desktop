import {app, BrowserWindow} from "electron";
import * as path from "path";

import "./server/server-infos/full-server-info-controller";
import "./server/server-infos/server-list-controller";
import "./server/server-infos/server-label-controller";

const start = async () => {
    await app.whenReady();
    await openWindow();
    app.on("activate", reopenWindow);
    app.on("window-all-closed", quitApp);
};

const openWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
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
