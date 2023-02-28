import { SubService } from './SubService';

export interface ServiceData {
    id: number;
    thumbnail: string;
    title: string;
    description?: string | React.ReactNode;
    subService: SubService[] | SubService;
}
