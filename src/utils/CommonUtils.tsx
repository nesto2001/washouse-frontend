import { ServicePricesModel } from '../models/Service/ServicePricesModel';

export function calculatePrice(
    priceChart: ServicePricesModel[],
    minPrice: number | null | undefined,
    weight: number,
): number {
    // if (!service.priceType) {
    //     return 0;
    // }
    const minimumPrice = minPrice || priceChart[0].price * priceChart[0].maxValue;
    if (priceChart) {
        for (let i = 0; i < priceChart.length; i++) {
            const { maxValue, price } = priceChart[i];
            if (weight <= maxValue) {
                if (minimumPrice && weight * price <= minimumPrice && weight <= priceChart[0].maxValue) {
                    return minimumPrice;
                } else {
                    return weight * price;
                }
            }
        }
    }
    return 0;
}

export function getWeightUnitPrice(priceChart: ServicePricesModel[], weight: number): number {
    // if (!service.priceType) {
    //     return 0;
    // }
    if (priceChart) {
        for (let i = 0; i < priceChart.length; i++) {
            const { maxValue, price } = priceChart[i];
            if (weight <= maxValue) {
                return price;
            }
        }
    }
    return 0;
}

export function getRating(rating: number | null): string {
    let ratingText = '';
    if (!rating) {
        return 'Chưa có';
    }
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

export function splitDescription(content: string, length: number): string {
    if (content.length < length) {
        return content;
    }
    return `${content.substring(0, length - 3)}...`;
}

export function generateRandomString(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
