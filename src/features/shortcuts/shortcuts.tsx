import { useRef, useState } from "react";
import { useShortcuts, type Shortcut } from "./use-shortcuts";
import { Button, Input } from "@/components";
import { cn, getFaviconUrl } from "@/lib/utils";
import { CheckIcon, PencilIcon, PlusIcon, XIcon } from "lucide-react";

const CONFIRM_REMOVE_MS = 3000;

export default function Shortcuts() {
  const {
    shortcuts,
    isFull,
    isAdding,
    startAdding,
    cancelAdding,
    addShortcut,
    editingId,
    editingShortcut,
    startEditing,
    cancelEditing,
    updateShortcut,
    removeShortcut,
    draggingId,
    startDragging,
    stopDragging,
    dragOver,
  } = useShortcuts();

  return (
    <div className="mt-8 flex flex-col gap-4">
      {isAdding && (
        <ShortcutForm
          key="add"
          onSubmit={addShortcut}
          onCancel={cancelAdding}
        />
      )}
      {editingShortcut && (
        <ShortcutForm
          key={editingShortcut.id}
          initialShortcut={editingShortcut}
          onSubmit={(label, url) =>
            updateShortcut(editingShortcut.id, label, url)
          }
          onCancel={cancelEditing}
        />
      )}

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {shortcuts.map((shortcut) => (
          <ShortcutTile
            key={shortcut.id}
            shortcut={shortcut}
            onEdit={startEditing}
            onRemove={removeShortcut}
            isEditing={editingId === shortcut.id}
            isDragging={draggingId === shortcut.id}
            onDragStart={() => startDragging(shortcut.id)}
            onDragEnter={() => dragOver(shortcut.id)}
            onDragEnd={stopDragging}
          />
        ))}
        {!isFull && <AddTile onClick={startAdding} />}
      </div>
    </div>
  );
}

function ShortcutTile({
  shortcut,
  onEdit,
  onRemove,
  isEditing,
  isDragging,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: {
  shortcut: Shortcut;
  onEdit: (shortcutId: string) => void;
  onRemove: (shortcutId: string) => void;
  isEditing: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
}) {
  const [faviconError, setFaviconError] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const cancelConfirm = () => {
    clearTimeout(resetTimerRef.current);
    setConfirmingRemove(false);
  };

  const handleRemove = () => {
    if (confirmingRemove) {
      cancelConfirm();
      onRemove(shortcut.id);
      return;
    }
    setConfirmingRemove(true);
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(
      () => setConfirmingRemove(false),
      CONFIRM_REMOVE_MS,
    );
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      }}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
      onMouseLeave={cancelConfirm}
      className={cn("group relative", isDragging && "opacity-50")}
    >
      <a
        href={shortcut.url}
        title={shortcut.url}
        draggable={false}
        className={cn(
          "border-border hover:border-accent flex flex-col items-center gap-2 rounded-md border p-4 transition-colors",
          isEditing && "border-accent",
        )}
      >
        <span className="bg-border-muted flex size-10 items-center justify-center overflow-hidden rounded-md">
          {faviconError ? (
            <span className="text-foreground-muted text-lg font-semibold uppercase">
              {shortcut.label.charAt(0)}
            </span>
          ) : (
            <img
              src={getFaviconUrl(shortcut.url)}
              alt={`Favicon for ${shortcut.label}`}
              draggable={false}
              className="size-6"
              onError={() => setFaviconError(true)}
            />
          )}
        </span>
        <span className="text-foreground-muted w-full truncate text-center text-xs">
          {shortcut.label}
        </span>
      </a>

      <div
        className={cn(
          "absolute -top-1 -right-1 hidden gap-1 group-hover:flex",
          (isEditing || confirmingRemove) && "flex",
        )}
      >
        <Button
          size="iconSm"
          radius="full"
          onClick={() => onEdit(shortcut.id)}
          aria-label={`Edit ${shortcut.label}`}
          className="bg-border hover:bg-accent"
        >
          <PencilIcon className="size-2.5" />
        </Button>
        <Button
          variant="destructive"
          size="iconSm"
          radius="full"
          onClick={handleRemove}
          aria-label={
            confirmingRemove
              ? `Confirm remove ${shortcut.label}`
              : `Remove ${shortcut.label}`
          }
          title={confirmingRemove ? "Click again to confirm" : undefined}
        >
          {confirmingRemove ? (
            <CheckIcon className="size-3" />
          ) : (
            <XIcon className="size-3" />
          )}
        </Button>
      </div>
    </div>
  );
}

function AddTile({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      tone="subtle"
      onClick={onClick}
      aria-label="Add shortcut"
      className="min-h-24.5 flex-col border-dashed"
    >
      <PlusIcon className="size-5" />
      <span className="text-xs">Add</span>
    </Button>
  );
}

function ShortcutForm({
  initialShortcut,
  onSubmit,
  onCancel,
}: {
  initialShortcut?: Shortcut;
  onSubmit: (label: string, url: string) => void;
  onCancel: () => void;
}) {
  const [url, setUrl] = useState(initialShortcut?.url ?? "");
  const [label, setLabel] = useState(initialShortcut?.label ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(label, url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
      className="border-border flex flex-col gap-2 rounded-md border p-4 sm:flex-row"
    >
      <Input
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="example.com"
      />
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label (optional)"
        className="sm:max-w-48"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="active">
          {initialShortcut ? "Save" : "Add"}
        </Button>
        <Button type="button" variant="ghost" tone="subtle" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
