export interface CenterMap {
    id: number;
    thumbnail: string;
    alias?: string;
    title: string;
    rating: number;
    numOfRating: number;
    location: {
        latitude: number;
        longitude: number;
    };
}
