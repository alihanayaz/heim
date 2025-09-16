import { useSearch } from "./useSearch";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  const { query, setQuery, inputRef, handleSubmit } = useSearch();

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
      />
      <SearchIcon className="text-foreground-lighter pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end" />
    </form>
  );
}
