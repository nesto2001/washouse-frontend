import { SubService } from '../types/ServiceType/SubService';

export function calculatePrice(service: SubService, weightOrQuantity: number): number | null {
    if (!service.priceChart) {
        return null;
    }

    for (let i = 0; i < service.priceChart.length; i++) {
        const { maxValue, price } = service.priceChart[i];
        if (weightOrQuantity <= maxValue) {
            return price;
        }
    }

    return null; // Return null if the weight or quantity exceeds the maximum value in the price chart
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
    callback: ({ latitude, longitude }: { latitude: number; longitude: number }) => void,
): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                callback({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            (error) => {
                console.error(`Gặp lỗi khi lấy vị trí: ${error.message}`);
                return null;
            },
        );
    } else {
        console.error('Geolocation không được hỗ trợ trên trình duyệt này.');
    }
}

export function getURLId(string: string): string {
    const url = 'http://localhost:3000//trung-tâm/giặt-sấy-dr.clean-c.2';
    const path = url.split('/').pop();
    const part = path?.split('-').pop();
    const id = part?.split('.').pop();
    if (id) {
        return id;
    } else {
        return '';
    }
}
