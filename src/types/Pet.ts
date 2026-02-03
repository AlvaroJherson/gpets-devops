export interface LocationInfo {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    lastSeen: string; // ISO date string
    trackingDeviceBattery?: string; // e.g. "85%"
}

export interface Pet {
    id: number;
    petName: string;
    ownerName: string;
    location?: LocationInfo; // Optional because list view might not have it, although we mock it.
    description?: string;
    photoUrl?: string;
}
