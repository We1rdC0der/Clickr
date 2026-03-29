const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  openExternal: (url) => ipcRenderer.invoke("open-external", url),
  getConnectedClients: () => ipcRenderer.invoke("get-connected-clients"),
  getServerInfo: () => ipcRenderer.invoke("get-server-info"),
  deleteClient: (clientId) => ipcRenderer.invoke("delete-client", clientId)
});