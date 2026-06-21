import { createContext, useContext } from "react";

export type ClockFormat = "24h" | "12h";

export const CLOCK_OPTIONS = [
  { id: "24h", label: "24-hour" },
  { id: "12h", label: "12-hour" },
] as const satisfies ReadonlyArray<{ id: ClockFormat; label: string }>;

export interface Settings {
  userName: string;
  clockFormat: ClockFormat;
}

export const DEFAULT_SETTINGS: Settings = {
  userName: "",
  clockFormat: "24h",
};

export const SETTINGS_STORAGE_KEY = "heim:settings";

export interface SettingsContextValue {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}
