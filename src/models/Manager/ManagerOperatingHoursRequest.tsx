export type ManagerOperatingHoursRequest = {
    day: number;
    openTime: string | null;
    closeTime: string | null;
}[];
