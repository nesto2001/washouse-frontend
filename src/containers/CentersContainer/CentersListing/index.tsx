import React from 'react';
import CenterCard from '../../../components/CenterCard';
import { CenterCardData } from '../../../types/CenterCardData';

type Props = {};

const CenterListing = (props: Props) => {
    const centers: CenterCardData[] = [
        {
            id: 1,
            thumbnail: 'https://example.com/image.jpg',
            title: 'Example Laundry Center',
            description: 'This is an example laundry center.',
            service: [
                { id: 1, title: 'Giặt sấy' },
                { id: 2, title: 'Giặt hấp' },
                { id: 3, title: 'Giặt rèm' },
                { id: 4, title: 'Giặt nệm' },
                { id: 5, title: 'Giặt khô' },
            ],
            additions: [
                { id: 1, title: 'Vận chuyển' },
                { id: 2, title: 'Thanh toán trực tuyến' },
            ],
            rating: 4.5,
            numOfRating: 10,
            phone: '0975926021',
            address: '518 Lê Văn Sỹ, Phường 14, Quận 3',
            operatingHours: [
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            ],
        },
        {
            id: 1,
            thumbnail: 'https://example.com/image.jpg',
            title: 'Example Laundry Center',
            description: 'This is an example laundry center.',
            service: [
                { id: 1, title: 'Giặt sấy' },
                { id: 2, title: 'Giặt hấp' },
                { id: 3, title: 'Giặt rèm' },
                { id: 4, title: 'Giặt nệm' },
                { id: 5, title: 'Giặt khô' },
            ],
            additions: [
                { id: 1, title: 'Vận chuyển' },
                { id: 2, title: 'Thanh toán trực tuyến' },
            ],
            rating: 4.5,
            numOfRating: 10,
            phone: '0975926021',
            address: '518 Lê Văn Sỹ, Phường 14, Quận 3',
            operatingHours: [
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            ],
        },
        {
            id: 1,
            thumbnail: 'https://example.com/image.jpg',
            title: 'Example Laundry Center',
            description: 'This is an example laundry center.',
            service: [
                { id: 1, title: 'Giặt sấy' },
                { id: 2, title: 'Giặt hấp' },
                { id: 3, title: 'Giặt rèm' },
                { id: 4, title: 'Giặt nệm' },
                { id: 5, title: 'Giặt khô' },
            ],
            additions: [
                { id: 1, title: 'Vận chuyển' },
                { id: 2, title: 'Thanh toán trực tuyến' },
            ],
            rating: 4.5,
            numOfRating: 10,
            phone: '0975926021',
            address: '518 Lê Văn Sỹ, Phường 14, Quận 3',
            operatingHours: [
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            ],
        },
        {
            id: 1,
            thumbnail: 'https://example.com/image.jpg',
            title: 'Example Laundry Center',
            description: 'This is an example laundry center.',
            service: [
                { id: 1, title: 'Giặt sấy' },
                { id: 2, title: 'Giặt hấp' },
                { id: 3, title: 'Giặt rèm' },
                { id: 4, title: 'Giặt nệm' },
                { id: 5, title: 'Giặt khô' },
            ],
            additions: [
                { id: 1, title: 'Vận chuyển' },
                { id: 2, title: 'Thanh toán trực tuyến' },
            ],
            rating: 4.5,
            numOfRating: 10,
            phone: '0975926021',
            address: '518 Lê Văn Sỹ, Phường 14, Quận 3',
            operatingHours: [
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
                { start: new Date('2023-02-26T01:00:00Z'), end: new Date('2023-02-26T13:00:00Z') },
            ],
        },
    ];

    return (
        <div className="flex flex-wrap gap-9">
            {centers.map((center) => {
                return <CenterCard {...center}></CenterCard>;
            })}
        </div>
    );
};

export default CenterListing;
