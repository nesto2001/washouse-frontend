export const BadgeStatusMap: { [key: string]: string } = {
    undefined: 'default',
    '': 'default',
    none: 'default',
    received: 'default',
    pending: 'warning',
    confirmed: 'cyan',
    processing: 'processing',
    ready: 'volcano',
    completed: 'green',
    cancelled: 'error',
};
