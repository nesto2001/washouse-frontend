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

export const TransactionBadgeStatusMap: { [key: string]: string } = {
    '': 'default',
    Pending: 'default',
    pending: 'default',
    success: 'success',
    Success: 'success',
    failed: 'error',
    Failed: 'Error',
};

export const ServiceBadgeStatusMap: { [key: string]: string } = {
    '': 'default',
    Pending: 'default',
    pending: 'default',
    success: 'success',
    Success: 'success',
    failed: 'error',
    Failed: 'Error',
};

export const DeliveryBadgeStatusMap: { [key: string]: string } = {
    '': 'default',
    Pending: 'default',
    pending: 'default',
    Delivering: 'processing',
    delivering: 'processing',
    Completed: 'success',
    completed: 'success',
};

export const PaymentBadgeStatusMap: { [key: string]: string } = {
    '': 'default',
    Pending: 'default',
    pending: 'default',
    Paid: 'success',
    paid: 'success',
    DonePaid: 'success',
    donepaid: 'success',
};
