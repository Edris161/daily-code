// User Types
export type UserRole = 'buyer' | 'seller' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'blocked' | 'pending_verification';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BuyerProfile extends User {
  preferences?: {
    language: string;
    currency: string;
    theme: 'light' | 'dark';
  };
}

export interface SellerProfile extends User {
  storeName: string;
  storeDescription?: string;
  storeLogo?: string;
  storeWallpaper?: string;
  verified: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected';
  rating: number;
  reviewCount: number;
  followersCount: number;
}

export interface AdminProfile extends User {
  permissions: string[];
  department?: string;
}

// Product Types
export type ProductStatus = 'active' | 'inactive' | 'pending_approval' | 'rejected' | 'delisted';

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  attributes: Record<string, string>;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  images: string[];
  price: number;
  comparePrice?: number;
  moq: number;
  bulkPricing?: Array<{
    minQuantity: number;
    maxQuantity?: number;
    price: number;
  }>;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  views: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  totalPrice: number;
  status?: OrderStatus;
}

export interface ShippingAddress {
  id: string;
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'wallet' | 'bank_transfer' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
}

// Review & Rating Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  selectedAt: Date;
  savedForLater: boolean;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  level: number;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

// Dispute & Refund Types
export type DisputeStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type DisputeReason = 'quality_issue' | 'not_received' | 'not_as_described' | 'damaged' | 'other';

export interface Dispute {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  reason: DisputeReason;
  description: string;
  evidence?: string[];
  status: DisputeStatus;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Auth Types
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  companyName?: string;
  phone?: string;
  country?: string;
}

// Notification Types
export type NotificationType = 'order' | 'promotion' | 'system' | 'message';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

// Analytics Types
export interface DashboardMetrics {
  totalSales: number;
  ordersCount: number;
  customersCount: number;
  revenue: number;
  averageOrderValue: number;
}

export interface SalesMetrics {
  date: string;
  sales: number;
  orders: number;
  revenue: number;
}
