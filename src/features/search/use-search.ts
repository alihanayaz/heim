import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/utils";

export type SearchEngineCategory = "engine" | "platform";

export interface SearchEngine {
  id: string;
  name: string;
  baseUrl: string;
  category: SearchEngineCategory;
}

export const SEARCH_ENGINES = [
  // Search Engines
  {
    id: "google",
    name: "Google",
    baseUrl: "https://www.google.com/search?q=",
    category: "engine",
  },
  {
    id: "bing",
    name: "Bing",
    baseUrl: "https://www.bing.com/search?q=",
    category: "engine",
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    baseUrl: "https://duckduckgo.com/?q=",
    category: "engine",
  },

  // Platforms
  {
    id: "youtube",
    name: "YouTube",
    baseUrl: "https://www.youtube.com/results?search_query=",
    category: "platform",
  },
  {
    id: "wikipedia",
    name: "Wikipedia",
    baseUrl: "https://en.wikipedia.org/w/index.php?search=",
    category: "platform",
  },
  {
    id: "reddit",
    name: "Reddit",
    baseUrl: "https://www.reddit.com/search/?q=",
    category: "platform",
  },
] as const satisfies readonly SearchEngine[];

export type SearchEngineEntry = (typeof SEARCH_ENGINES)[number];
export type SearchEngineId = SearchEngineEntry["id"];

const ENGINE_STORAGE_KEY = "heim:search-engine";

const FOCUS_IGNORED_KEYS = new Set([
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeEngine =
    SEARCH_ENGINES.find((engine) => engine.id === engineId) ??
    SEARCH_ENGINES[0];

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const selectEngine = (nextEngineId: SearchEngineId) => {
    setEngineId(nextEngineId);
    setIsMenuOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    const encodedQuery = encodeURIComponent(value);
    const searchUrl = `${activeEngine.baseUrl}${encodedQuery}`;
    window.location.href = searchUrl;
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) closeMenu();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || FOCUS_IGNORED_KEYS.has(e.key))
        return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    containerRef,
    inputRef,
    query,
    setQuery,
    handleSubmit,
    engines: SEARCH_ENGINES,
    activeEngine,
    selectEngine,
    isMenuOpen,
    toggleMenu,
  };
}
