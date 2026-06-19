import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

export const SEARCH_ENGINES = [
  { id: "google", name: "Google", baseUrl: "https://www.google.com/search?q=" },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    baseUrl: "https://duckduckgo.com/?q=",
  },
] as const;

export type SearchEngineId = (typeof SEARCH_ENGINES)[number]["id"];

const ENGINE_STORAGE_KEY = "heim:search-engine";

const BLOCKED_KEYS = new Set([
  " ",
  "Enter",
  "Tab",
  "Alt",
  "CapsLock",
  "Control",
  "Meta",
  "Shift",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  "Backspace",
  "Delete",
  "Escape",
  "Insert",
]);

export function useSearch() {
  const [query, setQuery] = useState<string>("");
  const [engineId, setEngineId] = useLocalStorage<SearchEngineId>(
    ENGINE_STORAGE_KEY,
    SEARCH_ENGINES[0].id,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const engine =
    SEARCH_ENGINES.find((e) => e.id === engineId) ?? SEARCH_ENGINES[0];

  const selectEngine = (id: SearchEngineId) => setEngineId(id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || BLOCKED_KEYS.has(e.key)) return;
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    const encodedQuery = encodeURIComponent(value);
    const searchUrl = `${engine.baseUrl}${encodedQuery}`;
    window.location.href = searchUrl;
  };

  return {
    inputRef,
    query,
    setQuery,
    handleSubmit,
    engines: SEARCH_ENGINES,
    engineId,
    selectEngine,
  };
}
