import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return { items: state.items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) };
          }
          return { items: [...state.items, { ...product, quantity }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) return { items: state.items.filter((i) => i.id !== id) };
          return { items: state.items.map((i) => i.id === id ? { ...i, quantity } : i) };
        }),
      clearCart: () => set({ items: [] }),
      getTotal: () => useCartStore.getState().items.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0),
      getCount: () => useCartStore.getState().items.reduce((acc, i) => acc + (i.quantity || 1), 0),
    }),
    { name: 'aurex-cart' }
  )
);
