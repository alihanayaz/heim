import { useState } from "react";
import { getHostname, normalizeUrl, useLocalStorage } from "@/lib/utils";

export interface Shortcut {
  id: string;
  label: string;
  url: string;
}

const STORAGE_KEY = "heim:shortcuts";

const MAX_SHORTCUTS = 12;

function buildShortcutFields(label: string, rawUrl: string) {
  const url = normalizeUrl(rawUrl);
  if (!url) return null;
  return { url, label: label.trim() || getHostname(url) };
}

export function useShortcuts() {
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>(
    STORAGE_KEY,
    [],
  );
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const isFull = shortcuts.length >= MAX_SHORTCUTS;

  const startAdding = () => {
    setEditingId(null);
    setIsAdding(true);
  };
  const cancelAdding = () => setIsAdding(false);
  const addShortcut = (label: string, rawUrl: string) => {
    if (isFull) return;
    const fields = buildShortcutFields(label, rawUrl);
    if (!fields) return;
    setShortcuts((prev) => [...prev, { id: crypto.randomUUID(), ...fields }]);
    setIsAdding(false);
  };

  const editingShortcut =
    shortcuts.find((shortcut) => shortcut.id === editingId) ?? null;
  const startEditing = (shortcutId: string) => {
    setIsAdding(false);
    setEditingId(shortcutId);
  };
  const cancelEditing = () => setEditingId(null);
  const updateShortcut = (
    shortcutId: string,
    label: string,
    rawUrl: string,
  ) => {
    const fields = buildShortcutFields(label, rawUrl);
    if (!fields) return;
    setShortcuts((prev) =>
      prev.map((shortcut) =>
        shortcut.id === shortcutId ? { ...shortcut, ...fields } : shortcut,
      ),
    );
    setEditingId(null);
  };

  const removeShortcut = (shortcutId: string) => {
    if (editingId === shortcutId) setEditingId(null);
    setShortcuts((prev) =>
      prev.filter((shortcut) => shortcut.id !== shortcutId),
    );
  };

  const startDragging = (shortcutId: string) => setDraggingId(shortcutId);
  const stopDragging = () => setDraggingId(null);
  const dragOver = (targetId: string) => {
    if (draggingId === null || draggingId === targetId) return;
    setShortcuts((prev) => {
      const fromIndex = prev.findIndex(
        (shortcut) => shortcut.id === draggingId,
      );
      const toIndex = prev.findIndex((shortcut) => shortcut.id === targetId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  return {
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
  };
}
