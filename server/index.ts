import { parse } from "url";
import { createServer, IncomingMessage, ServerResponse } from "http";
import WebSocket, { WebSocketServer } from "ws";

const PORT = 3002;
const ADMIN_SECRET = "ADMIN123";

// ------------------------------------------------------------------------------------ TYPES ------------------------------------------------------------------------------------
interface ToastPayload {
  id?: number;
  message: string;
  duration?: number;
  type?: "info" | "success" | "error" | "warning";
  className?: string;
}

type HandlerFn = (
  req: IncomingMessage,
  res: ServerResponse,
  body: string
) => void;

// ------------------------------------------------------------------------------------ UTILS ------------------------------------------------------------------------------------
function isToastPayload(obj: unknown): obj is ToastPayload {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as ToastPayload).message === "string"
  );
}

function log(
  event: string,
  info: Record<string, unknown> = {},
  level: "info" | "warn" | "error" = "info"
) {
  const ts = new Date().toISOString();
  const msg = `[${ts}] [${event}] ${
    Object.keys(info).length ? JSON.stringify(info) : ""
  }`;
  console[level](msg);
}

function parseBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

// ------------------------------------------------------------------------------------ WEBSOCKET SETUP ------------------------------------------------------------------------------------
const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  log("ClientConnected", { ip, totalClients: wss.clients.size });

  ws.on("close", () => {
    log("ClientDisconnected", { ip, totalClients: wss.clients.size });
  });
});

// ------------------------------------------------------------------------------------ ROUTES ------------------------------------------------------------------------------------
const routes: Map<string, HandlerFn> = new Map();

// POST /notification
routes.set("/notification", async (req, res, body) => {
  const apiKey = req.headers["x-api-key"] || req.headers["key"];
  if (apiKey !== ADMIN_SECRET) {
    log("UnauthorizedAttempt", { ip: req.socket.remoteAddress }, "warn");
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  try {
    const payload = JSON.parse(body);
    if (!isToastPayload(payload)) {
      log("InvalidPayload", { body: payload }, "warn");
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid toast structure" }));
      return;
    }

    log("Broadcasting /notification", { ...payload });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "notification", ...payload }));
      }
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Broadcast sent" }));
  } catch (err) {
    log("JSONParseError", { error: String(err) }, "error");
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Malformed JSON" }));
  }
});

// GET /trigger
routes.set("/trigger", async (req, res, body) => {
  const apiKey = req.headers["x-api-key"] || req.headers["key"];
  if (apiKey !== ADMIN_SECRET) {
    log("UnauthorizedAttempt", { ip: req.socket.remoteAddress }, "warn");
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  try {
    const payload = JSON.parse(body);

    log("Broadcasting /trigger", { ...payload });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "trigger", ...payload }));
      }
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Trigger broadcast sent" }));
  } catch (err) {
    log("BroadcastError", { error: String(err) }, "error");
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Broadcast failed" }));
  }
});

// ------------------------------------------------------------------------------------ REQUEST ROUTER ------------------------------------------------------------------------------------
server.on("request", async (req, res) => {
  const method = req.method ?? "";
  const url = req.url ?? "";
  const path = url.split("?")[0]; // normalize to only path

  // POST routes
  if (method === "POST" && routes.has(path)) {
    const body = await parseBody(req);
    return routes.get(path)!(req, res, body);
  }

  // GET routes (pass serialized query as "body")
  if (method === "GET" && routes.has(path)) {
    const parsed = parse(url, true).query;
    const body = JSON.stringify(parsed);
    return routes.get(path)!(req, res, body);
  }

  // Not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

// ------------------------------------------------------------------------------------ START ------------------------------------------------------------------------------------
server.listen(PORT, () => {
  log("ServerStarted", { port: PORT });
});
