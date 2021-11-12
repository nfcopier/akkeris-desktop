const {contextBridge} = require("electron");
const appsBridge = require("./apps-bridge.js");

contextBridge.exposeInMainWorld("apps", appsBridge);
