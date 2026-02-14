export const APP_NAME = "ApartmentFinder";
export const APP_DESCRIPTION = "Find your perfect apartment with ease";

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fa", name: "فارسی", flag: "🇮🇷" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;