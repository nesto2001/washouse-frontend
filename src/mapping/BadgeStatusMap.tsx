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
    success: 'green',
    Success: 'green',
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
    Completed: 'green',
    completed: 'green',
};

export const PaymentBadgeStatusMap: { [key: string]: string } = {
    '': 'default',
    Pending: 'default',
    pending: 'default',
    Paid: 'green',
    paid: 'green',
    DonePaid: 'green',
    donepaid: 'green',
};

export const OrderedDetailsBadgeStatusMap: { [key: string]: string } = {
    '': 'default',
    Pending: 'default',
    pending: 'default',
    processing: 'processing',
    Processing: 'processing',
    completed: 'green',
    Completed: 'green',
};
