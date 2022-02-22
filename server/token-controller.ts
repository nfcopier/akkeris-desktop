import {ipcMain} from "electron";

ipcMain.handle("token:add", () => {
    console.log("success!");
});
