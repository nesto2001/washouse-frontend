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

    const setState = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        setUserLocation({ latitude: latitude, longitude: longitude });
    };

    useEffect(() => {
        getCurrentLocation(setState);
    }, []);
    return (
        <div className="centers__map--wrapper">
            <div className="centers__map--inner">
                {userLocation && (
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
                )}
            </div>
        </div>
    );
};

export default CentersMap;
