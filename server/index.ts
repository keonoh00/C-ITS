import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

interface RequestInterface {
  id?: number; // Can be added client-side
  message: string;
  duration?: number;
  type?: "info" | "success" | "error" | "warning";
  className?: string;
  key: string; // required for authorization (ADMIN_SECRET)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidRequest(obj: any): obj is RequestInterface {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.key === "string" &&
    typeof obj.message === "string" &&
    (obj.duration === undefined || typeof obj.duration === "number") &&
    (obj.type === undefined ||
      ["info", "success", "error", "warning"].includes(obj.type)) &&
    (obj.className === undefined || typeof obj.className === "string")
  );
}

const PORT = 3002;
const ADMIN_SECRET = "admin";

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/trigger") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);

        if (!isValidRequest(parsed)) {
          res.writeHead(400);
          return res.end("Invalid toast message structure");
        }

        if (parsed.key !== ADMIN_SECRET) {
          res.writeHead(401);
          return res.end("Unauthorized");
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, ...toast } = parsed;

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(toast));
          }
        });

        res.writeHead(200);
        return res.end("Broadcast sent");
      } catch (err) {
        console.error("Invalid JSON:", err);
        res.writeHead(400);
        return res.end("Malformed JSON");
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
