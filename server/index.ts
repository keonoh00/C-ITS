import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = 3002;
const ADMIN_SECRET = "BLUEADMIN123";
interface RequestInterface {
  id?: number;
  message: string;
  duration?: number;
  type?: "info" | "success" | "error" | "warning";
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidRequest(obj: any): obj is RequestInterface {
  return (
    obj &&
    typeof obj === "object" &&
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

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/trigger") {
    const apiKey = req.headers["x-api-key"] || req.headers["key"];

    if (apiKey !== ADMIN_SECRET) {
      log("UnauthorizedAttempt", { ip: req.socket.remoteAddress }, "warn");
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Unauthorized" }));
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);

        if (!isValidRequest(parsed)) {
          log("InvalidStructure", { body: parsed }, "warn");
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ error: "Invalid toast message structure" })
          );
        }

        log(
          "BroadcastingMessage",
          parsed as unknown as Record<string, unknown>
        );

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(parsed));
          }
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Broadcast sent" }));
      } catch (err) {
        log("MalformedJSON", { error: String(err) }, "error");
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Malformed JSON" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
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
