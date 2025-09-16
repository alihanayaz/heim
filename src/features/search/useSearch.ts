import { useState, useRef, useEffect } from "react";

const SEARCH_BASE_URL = "https://www.google.com/search?q=";

const BLOCKED_KEYS = new Set([
  "Enter",
  "Backspace",
  "Tab",
  "Shift",
  "Control",
  "Alt",
  "Meta",
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "CapsLock",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Insert",
  "Delete",
  " ",
]);

export function useSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || BLOCKED_KEYS.has(e.key)) return;
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
        if (e.key.length === 1) {
          setQuery((prev) => prev);
        }
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
    const searchUrl = `${SEARCH_BASE_URL}${encodedQuery}`;
    window.open(searchUrl, "_blank");
    setQuery("");
    inputRef.current?.focus();
  };

  return {
    query,
    setQuery,
    inputRef,
    handleSubmit,
  };
}
