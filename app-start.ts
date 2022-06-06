import {app, BrowserWindow} from "electron";
import * as path from "path";

import "./footer/servers/full-server-info-controller";
import "./footer/servers/server-list-controller";
import "./footer/servers/server-label-controller";

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
    return mainWindow.loadFile(path.join(__dirname, "index.html"));
};

const reopenWindow = () => {
    if (BrowserWindow.getAllWindows().length === 0)
        return openWindow();
};

const quitApp = () => {
    if (process.platform !== 'darwin') app.quit();
};

start().then(() => {});
