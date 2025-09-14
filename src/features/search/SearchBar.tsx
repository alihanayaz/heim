import { useState, useRef } from "react";
import { SearchIcon } from "lucide-react";

const SEARCH_BASE_URL = "https://www.google.com/search?q=";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit}>
      <input
        className="border-border focus:ring-accent col-start-1 row-start-1 w-full rounded-md border px-4 py-2 shadow focus:ring-2 focus:outline-none"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web"
        autoFocus
      ></input>
      <SearchIcon className="text-foreground-lighter pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end" />
    </form>
  );
}
