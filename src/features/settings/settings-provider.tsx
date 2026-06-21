import { type ReactNode } from "react";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  SettingsContext,
  type Settings,
  type SettingsContextValue,
} from "./settings-context";
import { useLocalStorage } from "@/lib/use-local-storage";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorage<Settings>(
    SETTINGS_STORAGE_KEY,
    DEFAULT_SETTINGS,
  );

  const settings = { ...DEFAULT_SETTINGS, ...stored };

  const update: SettingsContextValue["update"] = (patch) =>
    setStored((prev) => ({ ...DEFAULT_SETTINGS, ...prev, ...patch }));

  return (
    <SettingsContext value={{ settings, update }}>{children}</SettingsContext>
  );
}
