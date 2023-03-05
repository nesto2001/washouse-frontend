export const formatCurrency = (value: number): string => {
    const formattedValue = value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formattedValue;
};
