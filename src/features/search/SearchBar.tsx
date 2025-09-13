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
        className="col-start-1 row-start-1 w-full rounded-md border border-zinc-200 px-4 py-2 shadow placeholder:text-zinc-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the web"
        autoFocus
      ></input>
      <SearchIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-zinc-400" />
    </form>
  );
}
