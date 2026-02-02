'use client';

import { CartItem } from '@/types';

const STORAGE_KEYS = {
  CART: 'cart',
};

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (itemId: string) => void;
  moveToCart: (itemId: string) => void;
  initializeCart: () => void;
  getCartSummary: () => { itemCount: number; totalPrice: number };
}

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
  return { itemCount, totalPrice };
};

let store: CartStore = {
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addToCart(item) {
    const existing = this.items.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    const totals = calculateTotals(this.items);
    this.totalItems = totals.itemCount;
    this.totalPrice = totals.totalPrice;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.items));
    }
  },

  removeFromCart(itemId) {
    this.items = this.items.filter((i) => i.id !== itemId);
    const totals = calculateTotals(this.items);
    this.totalItems = totals.itemCount;
    this.totalPrice = totals.totalPrice;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.items));
    }
  },

  updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
    const totals = calculateTotals(this.items);
    this.totalItems = totals.itemCount;
    this.totalPrice = totals.totalPrice;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.items));
    }
  },

  clearCart() {
    this.items = [];
    this.totalItems = 0;
    this.totalPrice = 0;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.CART);
    }
  },

  saveForLater(itemId) {
    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      item.savedForLater = true;
    }
    const totals = calculateTotals(this.items.filter((i) => !i.savedForLater));
    this.totalItems = totals.itemCount;
    this.totalPrice = totals.totalPrice;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.items));
    }
  },

  moveToCart(itemId) {
    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      item.savedForLater = false;
    }
    const totals = calculateTotals(this.items.filter((i) => !i.savedForLater));
    this.totalItems = totals.itemCount;
    this.totalPrice = totals.totalPrice;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.items));
    }
  },

  initializeCart() {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem(STORAGE_KEYS.CART);
      if (cart) {
        this.items = JSON.parse(cart);
        const totals = calculateTotals(this.items.filter((i) => !i.savedForLater));
        this.totalItems = totals.itemCount;
        this.totalPrice = totals.totalPrice;
      }
    }
  },

  getCartSummary() {
    const activeItems = this.items.filter((i) => !i.savedForLater);
    return {
      itemCount: activeItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: activeItems.reduce((sum, item) => sum + item.totalPrice, 0),
    };
  },
};

export const useCartStore = (): CartStore => store;
