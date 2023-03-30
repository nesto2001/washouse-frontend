import React, { useState, useEffect } from 'react';
import Map from '../../../components/Map/Map';
import { CenterModel } from '../../../models/Center/CenterModel';
import { CenterMap } from '../../../types/CenterMap';
import { getCurrentLocation } from '../../../utils/CommonUtils';

type CentersMapProps = {
    centerList: CenterModel[];
};

const CentersMap = ({ centerList }: CentersMapProps) => {
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>();
    const [centerLocation, setCenterLocation] = useState<{ latitude: number; longitude: number }>();

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setUserLocation({ latitude: latitude, longitude: longitude });
    };

    const setStateNoLocation = (error: any) => {
        console.log(`Gặp lỗi khi lấy vị trí hoặc quyền sử dụng vị trí chưa được cấp: ${error.message}`);
        console.log(centerList, '');
        setCenterLocation(centerList.at(0)?.location);
    };

    useEffect(() => {
        getCurrentLocation(setState, setStateNoLocation);
    }, [centerList]);
    return (
        <div className="centers__map--wrapper">
            <div className="centers__map--inner">
                {userLocation ? (
                    <Map
                        locations={centerList.map((center): CenterMap => {
                            return {
                                id: center.id,
                                thumbnail: center.thumbnail,
                                title: center.title,
                                alias: center.alias,
                                rating: center.rating,
                                numOfRating: center.numOfRating,
                                location: center.location,
                            };
                        })}
                        userLocation={userLocation}
                    ></Map>
                ) : (
                    <Map
                        locations={centerList.map((center): CenterMap => {
                            return {
                                id: center.id,
                                thumbnail: center.thumbnail,
                                title: center.title,
                                alias: center.alias,
                                rating: center.rating,
                                numOfRating: center.numOfRating,
                                location: center.location,
                            };
                        })}
                    ></Map>
                )}
            </div>
        </div>
    );
};

export default CentersMap;
