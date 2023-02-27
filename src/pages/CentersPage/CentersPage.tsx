import React from 'react';
import CenterListing from '../../containers/CentersContainer/CentersListing';
import CentersMap from '../../containers/CentersContainer/CentersMap';

const CentersPage = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date();

    console.log(days[day.getDay()]);
    return (
        <>
            <div className="centers__listing basis-3/5 pt-8 px-10">
                <div className="centers__listing--searching text-left mb-16">
                    <h2 className="text-2xl font-bold">Tìm kiếm dịch vụ giặt ủi trong khu vực xung quanh</h2>
                </div>
                <div className="centers__listing--main">
                    <CenterListing />
                </div>
            </div>
            <div className="centers__map basis-2/5">
                <CentersMap />
            </div>
        </>
    );
};

export default CentersPage;
