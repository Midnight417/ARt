export interface MonumentInfo {
    id: string;
    name: string;
    owner: string;
    creator: string;
    coordinates: { latitude: number, longitude: number };
    image: string;
    description: string;
}