import { ServiceDetailsModel } from '../models/Service/ServiceDetailsModel';
import { SubService } from '../types/ServiceType/SubService';

export function calculatePrice(service: ServiceDetailsModel, weight: number): number {
    // if (!service.priceType) {
    //     return 0;
    // }
    if (service.priceType && service.servicePrices) {
        for (let i = 0; i < service.servicePrices.length; i++) {
            const { maxValue, price } = service.servicePrices[i];
            if (weight <= maxValue) {
                if (service.minPrice && weight * price <= service.minPrice) {
                    return service.minPrice;
                } else {
                    return weight * price;
                }
            }
        }
    }
    return 0;
}

export function getRating(rating: number): string {
    let ratingText = '';
    if (rating >= 0 && rating <= 1) {
        ratingText = 'Rất tệ';
    } else if (rating > 1 && rating <= 2) {
        ratingText = 'Chưa ổn';
    } else if (rating > 2 && rating <= 3) {
        ratingText = 'Trung bình';
    } else if (rating > 3 && rating <= 4) {
        ratingText = 'Khá tốt';
    } else if (rating > 4 && rating <= 5) {
        ratingText = 'Tuyệt vời';
    }
    return ratingText;
}

export function getCurrentLocation(
    successCallback: ({ latitude, longitude }: { latitude: number; longitude: number }) => void,
    errorCallback: (error: any) => void,
): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                successCallback({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            (error) => {
                errorCallback(`Gặp lỗi khi lấy vị trí: ${error.message}`);
            },
        );
    } else {
        console.error('Geolocation không được hỗ trợ trên trình duyệt này.');
        errorCallback(new Error('Geolocation không được hỗ trợ trên trình duyệt này.'));
    }
}

export function getURLId(string: string): string {
    const url = string;
    const path = url.split('/').pop();
    const part = path?.split('-').pop();
    const id = part?.split('.').pop();
    if (id) {
        return id;
    } else {
        return '';
    }
}

export function maskEmail(email: string): string {
    const parts = email.split('@');
    return '*'.repeat(parts[0].length) + '@' + parts[1];
}
