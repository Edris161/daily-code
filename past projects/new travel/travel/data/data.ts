// data/travellers.ts
export type Traveller = {
  id: number;
  name: string;
  departDate: string;
  returnDate?: string;
  from: string;
  to: string;
  purpose: string;
};

export const travellers: Traveller[] = [
  {
    id: 1,
    name: "Alice Johnson",
    departDate: "2025-10-05",
    returnDate: "2025-10-12",
    from: "Kabul, Afghanistan",
    to: "Istanbul, Turkey",
    purpose: "Vacation",
  },
  {
    id: 2,
    name: "Bilal Ahmad",
    departDate: "2025-11-01",
    from: "Kabul, Afghanistan",
    to: "Dubai, UAE",
    purpose: "Business",
  },
  {
    id: 3,
    name: "Sara Mohammadi",
    departDate: "2025-12-15",
    returnDate: "2025-12-25",
    from: "Kabul, Afghanistan",
    to: "London, UK",
    purpose: "Visit family",
  },
  {
    id: 4,
    name: "Omar Safi",
    departDate: "2025-10-20",
    returnDate: "2025-10-27",
    from: "Kabul, Afghanistan",
    to: "Islamabad, Pakistan",
    purpose: "Conference",
  },
  {
    id: 5,
    name: "Laila Karim",
    departDate: "2026-01-10",
    returnDate: "2026-01-17",
    from: "Kabul, Afghanistan",
    to: "New Delhi, India",
    purpose: "Tour",
  },
];
