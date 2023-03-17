import React, { useEffect, useState, useRef } from 'react';
import { CenterMap } from '../../types/CenterMap';
import Target from '../../assets/images/target.png';
import CenterMarker from '../../assets/images/center-marker.png';
import Placeholder from '../../assets/images/placeholder.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import RatingStars from '../RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import { getCurrentLocation } from '../../utils/CommonUtils';

type Props = {
    selectedCenter?: CenterMap;
    locations?: CenterMap[];
    userLocation?: { latitude: number; longitude: number };
    centerLocation?: { latitude: number; longitude: number };
    style?: React.CSSProperties;
    iconSize?: L.PointExpression;
    iconAnchor?: L.PointExpression;
};

const Map = ({ selectedCenter, locations, userLocation, style, iconSize, iconAnchor, centerLocation }: Props) => {
    const center: L.LatLngExpression = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : centerLocation
        ? [centerLocation.latitude, centerLocation.longitude]
        : [0, 0];

    const userIcon = L.icon({
        iconUrl: Target,
        iconSize: iconSize ?? [40, 40],
        iconAnchor: iconAnchor ?? [20, 20],
        className: 'user-marker',
    });

    const centerIcon = L.icon({
        iconUrl: CenterMarker,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: 'center-marker',
    });

    const mapStyles = {
        height: '100vh',
        width: '100%',
    };

    const defaultCenter = {
        center,
    };

    // const handleMarkerClick = (center: CenterMap) => {
    //     setCenter({ lat: center.location.latitude, lng: center.location.longitude });
    // };

    // const [map, setMap] = useState<google.maps.Map | null>(null);

    // useEffect(() => {
    //     if (map) {
    //         // center the map on the selected center's location
    //         map.setCenter(center);
    //     }
    // }, [map, center]);

    return (
        <MapContainer center={center} zoom={16} style={style ?? mapStyles}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {center && (
                <Marker position={center} icon={userIcon}>
                    <Popup>Bạn đang ở đây</Popup>
                </Marker>
            )}
            {locations &&
                locations.map((location) => (
                    <Marker
                        key={location.id}
                        position={[location.location.latitude, location.location.longitude]}
                        icon={centerIcon}
                    >
                        <Popup>
                            <div>
                                <Link to="/centers/center" className="text-sub">
                                    <div className="w-[200px] h-[150px] max-w-[200px] max-h-[150px] rounded overflow-hidden">
                                        <img
                                            className="max-h-full w-full object-cover"
                                            src={location.thumbnail ?? Placeholder}
                                            alt=""
                                        />
                                    </div>
                                    <h3 className="text-left font-bold text-base max-w-[200px] mt-2 text-sub">
                                        {location.alias ?? location.title}
                                    </h3>
                                    <div className="flex items-center mt-3">
                                        <RatingStars rating={location.rating} />{' '}
                                        <span className="ml-2 text-base text-sub">{location.numOfRating}</span>
                                    </div>
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            {centerLocation && selectedCenter && (
                <Marker
                    key={selectedCenter.id}
                    position={[selectedCenter.location.latitude, selectedCenter.location.longitude]}
                    icon={centerIcon}
                >
                    <Popup>
                        <div>
                            <Link to="/centers/center" className="text-sub">
                                <div className="w-[200px] h-[150px] max-w-[200px] max-h-[150px] rounded overflow-hidden">
                                    <img
                                        className="max-h-full w-full object-cover"
                                        src={selectedCenter.thumbnail ?? Placeholder}
                                        alt=""
                                    />
                                </div>
                                <h3 className="text-left font-bold text-base max-w-[200px] mt-2 text-sub">
                                    {selectedCenter.alias ?? selectedCenter.title}
                                </h3>
                                <div className="flex items-center mt-3">
                                    <RatingStars rating={selectedCenter.rating} />{' '}
                                    <span className="ml-2 text-base text-sub">{selectedCenter.numOfRating}</span>
                                </div>
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
