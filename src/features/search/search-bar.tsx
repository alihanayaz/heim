import { useSearch } from "./use-search";
import { Button, Input } from "@/components";

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
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the web"
          autoFocus
        />
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
              tone={isActive ? "base" : "subtle"}
              className="px-3"
            >
              {engine.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
