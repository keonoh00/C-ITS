import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = 3002;
const ADMIN_SECRET = "admin";

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/send") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { key, ...toast } = JSON.parse(body);

        if (key !== ADMIN_SECRET) {
          res.writeHead(401);
          return res.end("Unauthorized");
        }

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(toast));
          }
        });

        res.writeHead(200);
        return res.end("Broadcast sent");
      } catch {
        res.writeHead(400);
        return res.end("Invalid JSON");
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Broadcast server running on http://localhost:${PORT}`);
});
