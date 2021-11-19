const {ipcMain} = require("electron");

ipcMain.handle("apps:create", () => {
    console.log("success!");
});
