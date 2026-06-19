import { useSearch } from "./use-search";
import { Button } from "@/components";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  const {
    inputRef,
    query,
    setQuery,
    handleSubmit,
    engines,
    engineId,
    selectEngine,
  } = useSearch();

  return (
    <div className="flex flex-col gap-3">
      <form className="group grid grid-cols-1" onSubmit={handleSubmit}>
        <input
          className="border-border group-hover:border-accent focus:ring-accent col-start-1 row-start-1 h-12 w-full rounded-md border px-4 py-2 text-base shadow transition-colors focus:ring-2 focus:outline-none"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web"
          autoFocus
        />
        <SearchIcon className="text-foreground-subtle pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end" />
      </form>

      <div className="flex items-center gap-1 px-1">
        {engines.map((engine) => {
          const isActive = engine.id === engineId;
          return (
            <Button
              key={engine.id}
              onClick={() => selectEngine(engine.id)}
              variant={isActive ? "active" : "ghost"}
              size="xs"
              className={cn(
                "px-3 text-sm",
                !isActive && "text-foreground-subtle hover:text-foreground",
              )}
            >
              {engine.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
