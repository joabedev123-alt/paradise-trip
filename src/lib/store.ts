import { create } from 'zustand';
import { Locale, defaultLocale } from '@/lib/i18n';

export type AvailabilityStatus = 'available' | 'few-spots' | 'unavailable' | 'on-request';

export interface TripItem {
  id: string;
  name: string;
  nameEs?: string;
  nameEn?: string;
  destination: string;
  country: string;
  category: string;
  image: string;
  price?: number;
  currency?: string;
  duration?: string;
  availability: AvailabilityStatus;
  date?: string;
  time?: string;
  adults: number;
  children: number;
  slug: string;
}

interface TripStore {
  items: TripItem[];
  addItem: (item: TripItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<TripItem>) => void;
  clearTrip: () => void;
  getTotalItems: () => number;
  hasItem: (id: string) => boolean;
}

export const useTripStore = create<TripStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const { items } = get();
    const exists = items.find((i) => i.id === item.id);
    if (!exists) {
      set({ items: [...items, item] });
    }
  },
  removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  updateItem: (id, updates) =>
    set({ items: get().items.map((i) => (i.id === id ? { ...i, ...updates } : i)) }),
  clearTrip: () => set({ items: [] }),
  getTotalItems: () => get().items.length,
  hasItem: (id) => !!get().items.find((i) => i.id === id),
}));

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: defaultLocale,
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('paradise-locale', locale);
    }
    set({ locale });
  },
}));
