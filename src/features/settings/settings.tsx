import { CLOCK_OPTIONS, useSettings } from "./settings-context";
import { useSettingsPanel } from "./use-settings-panel";
import { Button } from "@/components";
import { SettingsIcon, XIcon } from "lucide-react";

export default function Settings() {
  const { settings, update } = useSettings();
  const { isOpen, open, close } = useSettingsPanel();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        radius="full"
        onClick={open}
        aria-label="Open settings"
        className="text-foreground-subtle hover:text-foreground fixed top-4 right-4"
      >
        <SettingsIcon className="size-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
          <button
            onClick={close}
            aria-label="Close settings"
            className="fixed inset-0 bg-black/40"
          />

          <div className="border-border bg-background relative z-10 flex w-full max-w-xs flex-col gap-4 rounded-md border p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Settings</h2>
              <Button
                variant="ghost"
                size="icon"
                radius="full"
                onClick={close}
                aria-label="Close settings"
              >
                <XIcon className="size-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase">
                  Your name
                </span>
                <input
                  value={settings.userName}
                  onChange={(e) => update({ userName: e.target.value })}
                  placeholder="Name"
                  className="border-border hover:border-accent focus:ring-accent h-10 w-full rounded-md border px-4 py-2 text-base transition-colors focus:ring-2 focus:outline-none"
                />
              </label>

              <div className="flex flex-col gap-2">
                <span className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase">
                  Clock
                </span>
                <div className="flex gap-1">
                  {CLOCK_OPTIONS.map((option) => {
                    const isActive = settings.clockFormat === option.id;
                    return (
                      <Button
                        key={option.id}
                        onClick={() => update({ clockFormat: option.id })}
                        variant={isActive ? "active" : "ghost"}
                        size="sm"
                        tone={isActive ? "base" : "subtle"}
                        className="flex-1"
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
