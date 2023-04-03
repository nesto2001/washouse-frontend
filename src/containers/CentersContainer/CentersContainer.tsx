import { useEffect, useState } from 'react';
import EmptyData from '../../components/EmptyData/EmptyData';
import Loading from '../../components/Loading/Loading';
import Sidebar from '../../components/Sidebar';
import { CenterModel } from '../../models/Center/CenterModel';
import { getAllCenter } from '../../repositories/CenterRepository';
import { getCurrentLocation } from '../../utils/CommonUtils';
import CenterListing from './CentersListing';
import CentersMap from './CentersMap';

export type BudgetType = {
    min: number;
    max: number;
};

const CentersContainer = () => {
    const [centerList, setCenterList] = useState<CenterModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [sorting, setSorting] = useState<string>('location');
    const [servicesCheck, setServicesCheck] = useState<string[]>([]);
    const [hasDelivery, setHasDelivery] = useState<boolean>(false);
    const [budgetRange, setBudgetRange] = useState<BudgetType>({
        min: 0,
        max: 0,
    });

    useEffect(() => {
        getCurrentLocation(setState, setStateNoLocation);
    }, [sorting, servicesCheck]);

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setIsLoading(true);
        setIsEmpty(false);
        setLatitude(latitude);
        setLongitude(longitude);
        const fetchData = async () => {
            return await getAllCenter({
                lat: latitude,
                long: longitude,
                sort: sorting,
                categoryServices: servicesCheck.toString(),
            });
        };
        fetchData()
            .then((res) => {
                setCenterList(res);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error) {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
    };

    const setStateNoLocation = (error: any) => {
        console.log(`Gặp lỗi khi lấy vị trí hoặc quyền sử dụng vị trí chưa được cấp: ${error.message}`);
        setIsLoading(true);
        setIsEmpty(false);
        const fetchData = async () => {
            return await getAllCenter({
                sort: sorting,
                categoryServices: servicesCheck.toString(),
            });
        };
        fetchData()
            .then((res) => {
                setCenterList(res);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error) {
                    setIsLoading(false);
                    setIsEmpty(true);
                }
            });
    };

    return (
        <>
            <Sidebar
                setSorting={setSorting}
                sorting={sorting}
                servicesCheck={servicesCheck}
                setServicesCheck={setServicesCheck}
                budgetRange={budgetRange}
                setBudgetRange={setBudgetRange}
            />
            <div className="flex basis-5/6">
                <div className="centers__listing basis-3/5 pt-8 px-10">
                    <div className="centers__listing--searching text-left mb-16">
                        <h2 className="text-2xl font-bold">Tìm kiếm dịch vụ giặt ủi khu vực xung quanh</h2>
                    </div>
                    <div className="centers__listing--main">
                        {isLoading ? (
                            <Loading />
                        ) : isEmpty ? (
                            <EmptyData />
                        ) : (
                            <CenterListing centerList={centerList} selectedValues={servicesCheck} />
                        )}
                    </div>
                </div>
                <div className="centers__map basis-2/5">{!isLoading && <CentersMap centerList={centerList} />}</div>
            </div>
        </>
    );
};

export default CentersContainer;
