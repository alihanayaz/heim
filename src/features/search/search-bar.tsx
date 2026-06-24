import { useState } from "react";
import {
  useSearch,
  type SearchEngineEntry,
  type SearchEngineId,
} from "./use-search";
import { Button, Input } from "@/components";
import { cn, getFaviconUrl } from "@/lib/utils";
import { ChevronDownIcon, SearchIcon } from "lucide-react";

export default function SearchBar() {
  const {
    containerRef,
    inputRef,
    query,
    setQuery,
    handleSubmit,
    engines,
    activeEngine,
    selectEngine,
    isMenuOpen,
    toggleMenu,
  } = useSearch();

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${activeEngine.name}`}
          autoFocus
          className="h-14 pr-14 pl-18 shadow"
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-label={`Search engine: ${activeEngine.name}`}
          className="absolute top-1/2 left-2 -translate-y-1/2 gap-1 p-2"
        >
          <EngineIcon engine={activeEngine} className="size-5" />
          <ChevronDownIcon
            className={cn(
              "text-foreground-subtle size-4 transition-transform",
              isMenuOpen && "rotate-180",
            )}
          />
        </Button>

        <Button
          type="submit"
          variant="plain"
          tone="subtle"
          size="icon"
          aria-label="Search"
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <SearchIcon className="size-5" />
        </Button>
      </form>

      {isMenuOpen && (
        <EngineMenu
          engines={engines}
          selectedEngineId={activeEngine.id}
          onSelect={selectEngine}
        />
      )}
    </div>
  );
}

function EngineMenu({
  engines,
  selectedEngineId,
  onSelect,
}: {
  engines: readonly SearchEngineEntry[];
  selectedEngineId: SearchEngineId;
  onSelect: (engineId: SearchEngineId) => void;
}) {
  const searchEngines = engines.filter(
    (engine) => engine.category === "engine",
  );
  const platforms = engines.filter((engine) => engine.category === "platform");

  return (
    <div className="border-border bg-background absolute top-full right-0 left-0 z-20 mt-2 rounded-md border p-4 shadow-xl">
      <EngineSection
        title="Search Engines"
        engines={searchEngines}
        selectedEngineId={selectedEngineId}
        onSelect={onSelect}
      />
      <hr className="my-3" />
      <EngineSection
        title="Platforms"
        engines={platforms}
        selectedEngineId={selectedEngineId}
        onSelect={onSelect}
      />
    </div>
  );
}

function EngineSection({
  title,
  engines,
  selectedEngineId,
  onSelect,
}: {
  title: string;
  engines: readonly SearchEngineEntry[];
  selectedEngineId: SearchEngineId;
  onSelect: (engineId: SearchEngineId) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-foreground-subtle px-2 text-xs font-semibold tracking-wider uppercase">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
        {engines.map((engine) => (
          <EngineOption
            key={engine.id}
            engine={engine}
            isActive={engine.id === selectedEngineId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function EngineOption({
  engine,
  isActive,
  onSelect,
}: {
  engine: SearchEngineEntry;
  isActive: boolean;
  onSelect: (engineId: SearchEngineId) => void;
}) {
  return (
    <Button
      type="button"
      variant="plain"
      aria-pressed={isActive}
      onClick={() => onSelect(engine.id)}
      className={cn(
        "hover:bg-border-muted relative justify-start gap-4 text-left",
        isActive && "bg-border-muted",
      )}
    >
      {isActive && (
        <span className="bg-accent absolute top-2 bottom-2 left-0 w-0.5 rounded-md" />
      )}
      <EngineIcon engine={engine} className="size-5" />
      <span
        className={cn(
          "truncate",
          isActive
            ? "text-foreground font-medium"
            : "text-foreground-muted font-normal",
        )}
      >
        {engine.name}
      </span>
    </Button>
  );
}

function EngineIcon({
  engine,
  className,
}: {
  engine: SearchEngineEntry;
  className?: string;
}) {
  const [faviconError, setFaviconError] = useState(false);

  if (faviconError) {
    return (
      <span
        className={cn(
          "bg-border-muted text-foreground-muted flex items-center justify-center rounded-md text-sm font-semibold uppercase",
          className,
        )}
      >
        {engine.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={getFaviconUrl(engine.baseUrl)}
      alt={`Favicon for ${engine.name}`}
      className={cn("shrink-0 rounded-md", className)}
      onError={() => setFaviconError(true)}
    />
  );
}
