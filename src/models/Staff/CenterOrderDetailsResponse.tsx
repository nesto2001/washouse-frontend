export type CenterOrderDetailsReponse = {
    id: string;
    customerName: string;
    locationId: number;
    customerEmail: string;
    customerMobile: string;
    customerMessage: string;
    customerOrdered: number;
    totalOrderValue: number;
    deliveryType: number;
    deliveryPrice: number;
    preferredDropoffTime: string;
    preferredDeliverTime: string;
    status: string;
    orderedDetails: [
        {
            serviceName: string;
            serviceCategory: string;
            measurement: 4;
            unit: string;
            image: string;
            price: null;
            orderDetailTrackings: [];
        },
        {
            serviceName: string;
            serviceCategory: string;
            measurement: 3;
            unit: string;
            image: string;
            price: 45000;
            orderDetailTrackings: [];
        },
    ];
    orderTrackings: [];
    orderDeliveries: [
        {
            shipperName: null;
            shipperPhone: null;
            locationId: 22;
            deliveryType: true;
            estimatedTime: 14;
            deliveryDate: string;
            status: string;
        },
    ];
    orderPayment: {
        paymentTotal: 0;
        platformFee: 0;
        dateIssue: null;
        status: string;
        paymentMethod: 0;
        promoCode: string;
        discount: null;
        createdDate: string;
        updatedDate: null;
    };
};
