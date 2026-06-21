import { useState, useEffect } from "react";
import { useSettings } from "@/features/settings";

export function useClock() {
  const { settings } = useSettings();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: settings.clockFormat === "12h",
  });

  const seconds = String(now.getSeconds()).padStart(2, "0");

  return { time, seconds };
}
