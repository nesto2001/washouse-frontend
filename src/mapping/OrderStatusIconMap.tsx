import OrderPending from '../assets/images/order-pending.png';
import OrderConfirmed from '../assets/images/order-confirmed.png';
import OrderReceived from '../assets/images/order-received.png';
import OrderProcessing from '../assets/images/order-processing.png';
import OrderReady from '../assets/images/order-ready.png';
import OrderCompleted from '../assets/images/order-completed.png';
import OrderCancelled from '../assets/images/order-cancelled.png';

export const OrderStatusIconMap: { [key: string]: string } = {
    None: '',
    '': '',
    Pending: OrderPending,
    pending: OrderPending,
    Confirmed: OrderConfirmed,
    confirm: OrderConfirmed,
    confirmed: OrderConfirmed,
    received: OrderReceived,
    Received: OrderReceived,
    Processing: OrderProcessing,
    processing: OrderProcessing,
    Ready: OrderReady,
    ready: OrderReady,
    Completed: OrderCompleted,
    completed: OrderCompleted,
    Cancelled: OrderCancelled,
    cancelled: OrderCancelled,
};
