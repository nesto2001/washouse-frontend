import unorm from 'unorm';

export function formatLink(string: string) {
    const formattedString = unorm
        .nfc(string)
        .replace(/[\u0300-\u036f]/g, '')
        .replace(' ', '-')
        .toLowerCase();
    return formattedString;
}

export function formatCurrency(value: number): string {
    const formattedValue = value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formattedValue;
}
