export const locations = [
  {
    country: "Canada",
    city: "Toronto",
    location: [43.655063124858074, -79.37670127670063],
    flag: "🇨🇦",
    size: 0.05,
    
  },
  {
    country: "Belgium",
    city: "Amberes",
    location: [51.2213853, 4.400168],
    flag: "🇧🇪",
    size: 0.05,
  },
  {
    country: "Netherlands",
    city: "Rotterdam",
    location: [51.9225, 4.47917],
    flag: "🇳🇱",
    size: 0.05,
  },
  {
    country: "Spain",
    city: "Algeciras",
    location: [36.133333, -5.45],
    flag: "🇪🇸",
    size: 0.05,
  },
  {
    country: "Germany",
    city: "Hamburg",
    location: [53.57532, 10.01534],
    flag: "🇩🇪",
    size: 0.05,
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    location: [25.276987, 55.296249],
    flag: "🇦🇪",
  },
  {
    country: "USA",
    city: "Savannah",
    location: [32.083333, -81.1],
    flag: "🇺🇸",
  },
];

export type location = {
  country: string;
  city: string;
  location: [number, number];
  flag: string;
  size?: number;
};
