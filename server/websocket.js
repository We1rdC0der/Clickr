const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3210 });
const connectedClients = [];

console.log("Clickr WebSocket server running on port 3210");

function parseClientType(userAgent) {
  if (!userAgent) return "Browser/Local";
  
  const ua = userAgent.toLowerCase();
  
  // mobile OS check first
  if (ua.includes('android')) return "Android Browser";
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return "iOS Browser";
  
  if (ua.includes('electron')) return "Electron App";
  if (ua.includes('chrome')) return "Google Chrome";
  if (ua.includes('firefox')) return "Mozilla Firefox";
  if (ua.includes('safari')) return "Safari";
  if (ua.includes('edge')) return "Microsoft Edge";
  
  return "Browser";
}

wss.on("connection", function connection(ws, req) {
  const userAgent = req.headers['user-agent'] || '';
  const clientType = parseClientType(userAgent);
  
  console.log("Client connected -", "Type:", clientType, "User-Agent:", userAgent);
  
  const clientId = Math.random().toString(36).substr(2, 9);
  const client = {
    id: clientId,
    type: clientType,
    status: "connected",
    connectedAt: new Date(),
    ws: ws          // <-- added
  };
  connectedClients.push(client);
  console.log("Total clients:", connectedClients.length);

  ws.on("message", function message(data) {
    try {
      const msg = JSON.parse(data);
      if (msg.type === "button") {
        console.log("Button pressed:", msg.id);
      }
    } catch (e) {
      console.log("Invalid message:", data);
    }
  });

  ws.on("close", function close() {
    const index = connectedClients.findIndex(c => c.id === clientId);
    if (index > -1) {
      connectedClients.splice(index, 1);
    }
    console.log("Client disconnected. Remaining:", connectedClients.length);
  });

  ws.send(JSON.stringify({
    type: "connected",
    message: "Connected to Clickr",
    clientId: clientId
  }));
});

module.exports = { connectedClients, wss };