// @ts-ignore
import React from "https://cdn.skypack.dev/react"
// @ts-ignore
import ReactDOM from "https://cdn.skypack.dev/react-dom"
// @ts-ignore
const ipc = window.ipc as (event: String, ...args: any[]) => Promise<void>;

export {React, ReactDOM, ipc};
