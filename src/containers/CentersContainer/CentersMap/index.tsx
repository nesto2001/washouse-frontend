import React from 'react';
import Map from '../../../components/Map/Map';
import { CenterMap } from '../../../types/CenterMap';

type Props = {};

const CentersMap = (props: Props) => {
    const centerData: CenterMap[] = [
        {
            id: 1,
            thumbnail: 'https://example.com/thumbnail1.jpg',
            title: 'Laundry Center 1',
            service: [
                { id: 1, title: 'Wash & Fold' },
                { id: 2, title: 'Dry Cleaning' },
            ],
            additions: [
                { id: 3, title: 'Pickup & Delivery' },
                { id: 4, title: 'Alterations' },
            ],
            rating: 4.5,
            numOfRating: 123,
            location: {
                lat: 37.7749,
                lng: -122.4194,
            },
        },
        {
            id: 2,
            thumbnail: 'https://example.com/thumbnail2.jpg',
            title: 'Laundry Center 2',
            service: [
                { id: 1, title: 'Wash & Fold' },
                { id: 3, title: 'Self-service' },
            ],
            additions: [{ id: 4, title: 'Alterations' }],
            rating: 4.2,
            numOfRating: 98,
            location: {
                lat: 37.7831,
                lng: -122.4039,
            },
        },
        {
            id: 3,
            thumbnail: 'https://example.com/thumbnail3.jpg',
            title: 'Laundry Center 3',
            service: [
                { id: 2, title: 'Dry Cleaning' },
                { id: 3, title: 'Self-service' },
            ],
            additions: [
                { id: 1, title: 'Wash & Fold' },
                { id: 4, title: 'Alterations' },
            ],
            rating: 4.8,
            numOfRating: 256,
            location: {
                lat: 37.7946,
                lng: -122.3996,
            },
        },
    ];
    return (
        <div className="centers__map--wrapper">
            <div className="centers__map--inner">
                <Map centers={centerData}></Map>
            </div>
        </div>
    );
};

export default CentersMap;
