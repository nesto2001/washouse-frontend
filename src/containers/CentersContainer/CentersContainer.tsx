import React, { useEffect, useState } from 'react';
import { CenterModel } from '../../models/Center/CenterModel';
import { CentersPage } from '../../pages';
import { getAllCenter } from '../../repositories/CenterRepository';
import CentersMap from './CentersMap';
import CenterListing from './CentersListing';
import Loading from '../../components/Loading/Loading';
import { getCurrentLocation } from '../../utils/CommonUtils';

const CentersContainer = () => {
    const [centerList, setCenterList] = useState<CenterModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();

    useEffect(() => {
        getCurrentLocation(setState);
    }, []);

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setLatitude(latitude);
        setLongitude(longitude);
        const fetchData = async () => {
            return await getAllCenter({ lat: latitude, long: longitude });
        };
        fetchData().then((res) => {
            setCenterList(res);
            setIsLoading(false);
        });
    };

    if (isLoading) {
        return <Loading screen />;
    }

    return (
        <>
            <div className="centers__listing basis-3/5 pt-8 px-10">
                <div className="centers__listing--searching text-left mb-16">
                    <h2 className="text-2xl font-bold">Tìm kiếm dịch vụ giặt ủi khu vực xung quanh</h2>
                </div>
                <div className="centers__listing--main">
                    <CenterListing centerList={centerList} />
                </div>
            </div>
            <div className="centers__map basis-2/5">
                <CentersMap centerList={centerList} />
            </div>
        </>
    );
};

export default CentersContainer;
