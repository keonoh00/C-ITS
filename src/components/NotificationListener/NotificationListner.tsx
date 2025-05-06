"use client";

import { useEffect } from "react";
import { Toast, useToast } from "@/components/ToastProvider/ToastProvider";

export default function NotificationListener() {
  const showToast = useToast();

  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.hostname}:3002`);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const { message, type, duration } = JSON.parse(event.data) as Toast;

        if (typeof message === "string") {
          showToast(message, {
            type: type || "info",
            duration: duration || 3000,
          });
        }
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socket.close();
  }, [showToast]);

  return null;
}
