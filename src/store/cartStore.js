import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
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
      clearCart: () => set({ items: [], coupon: null }),
      setCoupon: (coupon) => set({ coupon }),
      getSubtotal: () =>
        get().items.reduce((acc, i) => acc + (i.discountPrice ?? i.price ?? 0) * (i.quantity || 1), 0),
      getDiscount: () => {
        const { coupon, items } = get();
        if (!coupon) return 0;
        const subtotal = items.reduce((acc, i) => acc + (i.discountPrice ?? i.price ?? 0) * (i.quantity || 1), 0);
        if (coupon.type === 'percent') return (subtotal * (coupon.value / 100));
        return Math.min(coupon.value ?? 0, subtotal);
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.max(0, subtotal - discount);
      },
      getCount: () => get().items.reduce((acc, i) => acc + (i.quantity || 1), 0),
    }),
    { name: 'aurex-cart' }
  )
);
