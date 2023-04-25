export const OrderStatusMap: { [key: string]: string } = {
    None: 'Chưa có',
    Received: 'Đang chờ',
    Pending: 'Đang chờ',
    pending: 'Đang chờ',
    Confirmed: 'Xác nhận',
    confirm: 'Xác nhận',
    confirmed: 'Xác nhận',
    Processing: 'Xử lý',
    processing: 'Xử lý',
    Ready: 'Sẵn sàng',
    ready: 'Sẵn sàng',
    Completed: 'Hoàn tất',
    completed: 'Hoàn tất',
    Cancelled: 'Đã hủy',
    cancelled: 'Đã hủy',
};

export const ServiceStatusMap: { [key: string]: string } = {
    '': 'Chưa có',
    none: 'Chưa có',
    active: 'Đang hoạt động',
    inactive: 'Tạm ngưng',
    suspended: 'Vi phạm',
    hidden: 'Đã ẩn',
};

export const PaymentStatusMap: { [key: string]: string } = {
    '': 'Chưa có',
    none: 'Chưa có',
    Pending: 'Đang chờ',
    pending: 'Đang chờ',
    Paid: 'Đã thanh toán',
    paid: 'Đã thanh toán',
    DonePaid: 'Đã thanh toán',
    donepaid: 'Đã thanh toán',
};
