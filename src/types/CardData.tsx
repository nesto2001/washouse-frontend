export interface CardData {
    id: number;
    thumbnail: string;
    title: string;
    description?: string | React.ReactNode;
    price?: number;
    action?: boolean;
    actionContent?: string;
    actionType?: string;
    actionLink?: string;
    minHeight?: string;
    cardHeight?: string;
}
