export interface BlogCardData {
    id: number;
    type: number;
    thumbnail: string;
    title: string;
    description: string | React.ReactNode;
    date: Date;
}
