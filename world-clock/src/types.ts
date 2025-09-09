// Tillåtna tidzoner som string literal type eller enum 
export type TimeZone = 
| "Europe/Stockholm"
| "Europe/Paris"
| "Europe/London"
| "America/New_York"
| "America/Los_Angeles"
| "Asia/Tokyo"
| "Asia/Shanghai"
| "Australia/Sydney"
| (string & {}); // fallback so users can enter their own time zones

// Interface for each city 
export interface City {
    id: string;         // unique ID (e.g., from uuid)
    name: string        // City name (Stockholm)
    timezone: TimeZone; // Timezone for each city
    imageUrl?: string;  // Optional background image for the detail view
}

// Setting for each clock (digital and 	analogue)

export interface ClockSettings {
    mode: "digital" | "analog"
}