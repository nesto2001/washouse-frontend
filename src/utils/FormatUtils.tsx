import unorm from 'unorm';

export function formatLink(string: string) {
    const formattedString = unorm
        .nfc(string)
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '-')
        .toLowerCase();
    return formattedString;
}

export function decodeURILink(string: string) {
    const formattedString = decodeURIComponent(string);
    return formattedString;
}

export function decodeURI(string: string) {
    const formattedString = decodeURIComponent(string).replace(/-/g, ' ');
    return formattedString;
}

export function formatCurrency(value: number): string {
    const formattedValue = value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formattedValue;
}

export function formatPercentage(value: number): string {
    return `${value * 100}%`;
}
