// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
export const API_TIMEOUT = 30000; // 30 seconds

// Roles
export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

// Product Status
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING_APPROVAL: 'pending_approval',
  REJECTED: 'rejected',
  DELISTED: 'delisted',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  WALLET: 'wallet',
  BANK_TRANSFER: 'bank_transfer',
  CASH_ON_DELIVERY: 'cash_on_delivery',
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  card: 'Credit/Debit Card',
  wallet: 'Wallet',
  bank_transfer: 'Bank Transfer',
  cash_on_delivery: 'Cash on Delivery',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZES = [10, 20, 50, 100];

// Sort Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_LOW_HIGH: 'price_asc',
  PRICE_HIGH_LOW: 'price_desc',
  RATING: 'rating',
  POPULARITY: 'popularity',
} as const;

export const SORT_OPTION_LABELS: Record<string, string> = {
  newest: 'Newest',
  oldest: 'Oldest',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
  rating: 'Highest Rating',
  popularity: 'Most Popular',
};

// Categories
export const MAIN_CATEGORIES = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Fashion', slug: 'fashion' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden' },
  { id: '4', name: 'Sports & Outdoors', slug: 'sports-outdoors' },
  { id: '5', name: 'Beauty & Health', slug: 'beauty-health' },
  { id: '6', name: 'Toys & Games', slug: 'toys-games' },
  { id: '7', name: 'Automotive', slug: 'automotive' },
  { id: '8', name: 'Office & School', slug: 'office-school' },
];

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
};

// Time Constants
export const TIME_CONSTANTS = {
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  OTP_EXPIRY: 10 * 60 * 1000, // 10 minutes
  RESEND_OTP_COOLDOWN: 60 * 1000, // 60 seconds
};

// Notification Types
export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
  MESSAGE: 'message',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ROLE: 'user_role',
  CART: 'cart',
  WISHLIST: 'wishlist',
  SEARCH_HISTORY: 'search_history',
  PREFERENCES: 'preferences',
  THEME: 'theme',
};

// Routes
export const ROUTES = {
  // Public
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CATEGORIES: '/categories',
  SEARCH: '/search',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  HELP_CENTER: '/help',
  TERMS: '/terms',
  PRIVACY: '/privacy',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  EMAIL_VERIFICATION: '/verify-email/:token',
  OTP_VERIFICATION: '/otp-verification',

  // Buyer
  BUYER_DASHBOARD: '/buyer/dashboard',
  BUYER_ORDERS: '/buyer/orders',
  BUYER_ORDER_DETAIL: '/buyer/orders/:id',
  BUYER_PROFILE: '/buyer/profile',
  BUYER_ADDRESSES: '/buyer/addresses',
  BUYER_WISHLIST: '/buyer/wishlist',
  BUYER_CART: '/buyer/cart',
  BUYER_CHECKOUT: '/buyer/checkout',
  BUYER_MESSAGES: '/buyer/messages',
  BUYER_NOTIFICATIONS: '/buyer/notifications',

  // Seller
  SELLER_DASHBOARD: '/seller/dashboard',
  SELLER_PRODUCTS: '/seller/products',
  SELLER_ORDERS: '/seller/orders',
  SELLER_ANALYTICS: '/seller/analytics',
  SELLER_PROFILE: '/seller/profile',
  SELLER_WALLET: '/seller/wallet',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_SETTINGS: '/admin/settings',
};

// Default Values
export const DEFAULTS = {
  CURRENCY: 'USD',
  LANGUAGE: 'en',
  TIMEZONE: 'UTC',
  DATE_FORMAT: 'MMM dd, yyyy',
  TIME_FORMAT: 'hh:mm a',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  ACCOUNT_LOCKED: 'Your account has been locked. Please contact support.',
  VERIFICATION_REQUIRED: 'Please verify your email first.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful! Please check your email to verify.',
  PASSWORD_RESET_SENT: 'Password reset link sent to your email.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  ORDER_PLACED: 'Order placed successfully!',
  PRODUCT_ADDED: 'Product added successfully.',
  PRODUCT_UPDATED: 'Product updated successfully.',
};
