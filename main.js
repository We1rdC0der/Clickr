const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const WebSocket = require("ws");

// Load websocket server
const wsModule = require("./server/websocket");
const { connectedClients } = wsModule;

// Load HTTP server
const { getLocalIP, PORT } = require("./server/http-server");

function createWindow() {
  const win = new BrowserWindow({
    width: 1800,
    height: 1000,
    icon: path.join(__dirname, "assets/icons/favicon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("ui/index.html");
}

// Register IPC handlers
ipcMain.handle('open-external', async (event, url) => {
  const { shell } = require("electron");
  await shell.openExternal(url);
});

ipcMain.handle('get-connected-clients', async (event) => {
  // Strip the ws property before sending over IPC
  const sanitized = connectedClients.map(({ ws, ...rest }) => rest);
  console.log('Returning connected clients:', sanitized);
  return sanitized;
});

ipcMain.handle('get-server-info', async (event) => {
  const localIP = getLocalIP();
  return {
    ip: localIP,
    port: PORT,
    url: `http://${localIP}:${PORT}`
  };
});

ipcMain.handle('delete-client', async (event, clientId) => {
  console.log('delete-client called for:', clientId);
  const index = connectedClients.findIndex(c => c.id === clientId);
  console.log('Client index found:', index);
  if (index === -1) return { success: false, error: 'Client not found' };

  const client = connectedClients[index];
  console.log('Client object:', client);
  console.log('Client ws:', client.ws);
  console.log('WebSocket readyState:', client.ws?.readyState);

  if (client.ws && client.ws.readyState === WebSocket.OPEN) {
    console.log('Sending disconnected message...');
    client.ws.send(JSON.stringify({ type: "disconnected", message: "Removed by server" }));
    setTimeout(() => client.ws.close(), 500);
  } else {
    console.log('WS not open or not found — readyState:', client.ws?.readyState);
  }

  connectedClients.splice(index, 1);
  console.log(`Deleted client: ${clientId}`);
  return { success: true };
});

app.whenReady().then(createWindow);