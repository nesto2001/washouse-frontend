import React from 'react';
import Button from '../../components/Button';
import Map from '../../components/Map/Map';

const AddressPage = () => {
    const userAddress = {
        latitude: 10.746564906708516,
        longitude: 106.6452826711652,
    };

    const mapStyles: React.CSSProperties = {
        height: '100%',
        width: '100%',
    };

    const iconSize: L.PointExpression = [30, 30];
    const iconAnchor: L.PointExpression = [15, 15];
    return (
        <div className="useraddress w-full border border-wh-gray rounded-2xl mb-10">
            <div className="useraddress--header pt-4 pl-6 font-bold text-xl">Địa chỉ của tôi</div>
            <hr className="mt-3 mb-8" />
            <div className="useraddress--content flex justify-between pl-14 pr-6 mb-16">
                <div className="useraddress--details">
                    <div className="useraddress--user flex justify-start items-center">
                        <div className="font-medium">Trần Tân Long</div>
                        <div className="mx-3 border bg-wh-gray w-[0.5px] h-6"></div>
                        <div className="text-sm text-sub-gray">0975926021</div>
                    </div>
                    <div className="useraddress--address grid grid-cols-3 mt-5 gap-y-6">
                        <div className="col-span-1 min-w-[150px] flex flex-col">
                            <div className="font-medium text-sub-gray">Tỉnh / thành phố</div>
                            <div className="mt-3">TP. Hồ Chí Minh</div>
                        </div>
                        <div className="col-span-1 min-w-[150px] flex flex-col">
                            <div className="font-medium text-sub-gray">Quận / huyện</div>
                            <div className="mt-3">Quận 6</div>
                        </div>
                        <div className="col-span-1 min-w-[150px] flex flex-col">
                            <div className="font-medium text-sub-gray">Phường / xã</div>
                            <div className="mt-3">Phường 4</div>
                        </div>
                        <div className="col-span-3 min-w-[140px] flex flex-col">
                            <div className="font-medium text-sub-gray">Địa chỉ cụ thể</div>
                            <div className="mt-3 h-16">234/89B Phạm Phú Thứ</div>
                        </div>
                    </div>
                    <div className="useraddress--update">
                        <Button type="primary">Cập nhật</Button>
                    </div>
                </div>
                <div className="mx-6 bg-wh-gray w-[0.5px] max-h-[224px]"></div>
                <div className="useraddress__map w-full max-w-[280px] max-h-[200px] pt-3">
                    <div className="useraddress__map--container h-[200px] rounded-2xl border border-wh-gray overflow-hidden">
                        <Map
                            userLocation={userAddress}
                            style={mapStyles}
                            iconSize={iconSize}
                            iconAnchor={iconAnchor}
                        ></Map>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
