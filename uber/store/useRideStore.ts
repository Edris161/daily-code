import { create } from 'zustand';

export type RideType = 'UberX' | 'UberXL' | 'UberBlack';
export type UserRole = 'passenger' | 'driver';
export type RideStatus = 'idle' | 'searching' | 'accepted' | 'arrived' | 'ongoing' | 'completed' | 'cancelled';

interface RideStore {
  pickupLocation: string;
  dropoffLocation: string;
  selectedRideType: RideType | null;
  estimatedPrice: number;
  estimatedArrivalTime: number; // in minutes
  userRole: UserRole;
  currentRideStatus: RideStatus;
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  userPhone: string;
  driverIsOnline: boolean;
  setPickupLocation: (location: string) => void;
  setDropoffLocation: (location: string) => void;
  setSelectedRideType: (type: RideType) => void;
  setEstimatedPrice: (price: number) => void;
  setEstimatedArrivalTime: (time: number) => void;
  setUserRole: (role: UserRole) => void;
  setCurrentRideStatus: (status: RideStatus) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setUserInfo: (name: string, email: string, phone: string) => void;
  setDriverIsOnline: (online: boolean) => void;
  resetRide: () => void;
}

export const useRideStore = create<RideStore>((set) => ({
  pickupLocation: '',
  dropoffLocation: '',
  selectedRideType: null,
  estimatedPrice: 0,
  estimatedArrivalTime: 0,
  userRole: 'passenger',
  currentRideStatus: 'idle',
  isAuthenticated: false,
  userName: '',
  userEmail: '',
  userPhone: '',
  driverIsOnline: false,
  setPickupLocation: (location) => set({ pickupLocation: location }),
  setDropoffLocation: (location) => set({ dropoffLocation: location }),
  setSelectedRideType: (type) => set({ selectedRideType: type }),
  setEstimatedPrice: (price) => set({ estimatedPrice: price }),
  setEstimatedArrivalTime: (time) => set({ estimatedArrivalTime: time }),
  setUserRole: (role) => set({ userRole: role }),
  setCurrentRideStatus: (status) => set({ currentRideStatus: status }),
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  setUserInfo: (name, email, phone) =>
    set({ userName: name, userEmail: email, userPhone: phone }),
  setDriverIsOnline: (online) => set({ driverIsOnline: online }),
  resetRide: () =>
    set({
      pickupLocation: '',
      dropoffLocation: '',
      selectedRideType: null,
      estimatedPrice: 0,
      estimatedArrivalTime: 0,
      currentRideStatus: 'idle',
    }),
}));
