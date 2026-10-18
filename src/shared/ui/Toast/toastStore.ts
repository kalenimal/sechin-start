'use client';

import { create } from 'zustand';

export type ToastTone = 'success' | 'error' | 'info';
export type ToastItem = { id: number; message: string; tone: ToastTone; leaving?: boolean };

type ToastState = {
  items: ToastItem[];
  push: (message: string, tone?: ToastTone) => void;
  dismiss: (id: number) => void;
};

const VISIBLE_MS = 3500;
const LEAVE_MS = 200;
let nextId = 1;

// Toasts are purely client-side UI state, so a module-level store is safe (nothing is pushed during SSR).
export const useToastStore = create<ToastState>((set, get) => ({
  items: [],
  push: (message, tone = 'success') => {
    const id = nextId++;
    set((state) => ({ items: [...state.items.slice(-2), { id, message, tone }] }));
    setTimeout(() => get().dismiss(id), VISIBLE_MS);
  },
  dismiss: (id) => {
    set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, leaving: true } : item)) }));
    setTimeout(() => set((state) => ({ items: state.items.filter((item) => item.id !== id) })), LEAVE_MS);
  },
}));

/** Imperative API: `toast.success('Сохранено')` from event handlers and mutation callbacks. */
export const toast = {
  success: (message: string) => useToastStore.getState().push(message, 'success'),
  error: (message: string) => useToastStore.getState().push(message, 'error'),
  info: (message: string) => useToastStore.getState().push(message, 'info'),
};
