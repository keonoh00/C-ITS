import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

interface RequestInterface {
  id?: number;
  message: string;
  duration?: number;
  type?: "info" | "success" | "error" | "warning";
  className?: string;
  key: string;
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

function log(
  event: string,
  info: Record<string, unknown> = {},
  level: "info" | "warn" | "error" = "info"
) {
  const timestamp = new Date().toISOString();
  const base = `[${timestamp}] [${event}]`;
  const details = Object.keys(info).length ? JSON.stringify(info) : "";

  const output = `${base} ${details}`;

  switch (level) {
    case "warn":
      console.warn(output);
      break;
    case "error":
      console.error(output);
      break;
    default:
      console.log(output);
  }
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
          log("InvalidStructure", { body: parsed }, "warn");
          res.writeHead(400);
          return res.end("Invalid toast message structure");
        }

        if (parsed.key !== ADMIN_SECRET) {
          log("UnauthorizedAttempt");
          res.writeHead(401);
          return res.end("Unauthorized");
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { key, ...toast } = parsed;
        log("BroadcastingMessage", toast);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(toast));
          }
        });

        res.writeHead(200);
        return res.end("Broadcast sent");
      } catch (err) {
        log("MalformedJSON", { error: String(err) }, "error");
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

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  log("ClientConnected", { ip, totalClients: wss.clients.size });

  ws.on("close", () => {
    log("ClientDisconnected", { ip, totalClients: wss.clients.size });
  });
});

server.listen(PORT, () => {
  log("ServerStarted", { port: PORT });
});
