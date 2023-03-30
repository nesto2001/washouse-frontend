import React, { useEffect, useState, useRef } from 'react';
import { CenterMap } from '../../types/CenterMap';
import Target from '../../assets/images/target.png';
import CenterMarker from '../../assets/images/center-marker.png';
import Placeholder from '../../assets/images/placeholder.png';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, useMapEvents } from 'react-leaflet';
import L, { LatLngTuple, LeafletEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import RatingStars from '../RatingStars/RatingStars';
import { Link } from 'react-router-dom';
import { getCurrentLocation } from '../../utils/CommonUtils';
import { LocationType } from '../../types/LocationType';
import MapZoom from './MapZoom';
import { formatLink } from '../../utils/FormatUtils';

type Props = {
    selectedCenter?: CenterMap;
    locations?: CenterMap[];
    userLocation?: { latitude: number; longitude: number };
    centerLocation?: { latitude: number; longitude: number };
    style?: React.CSSProperties;
    iconSize?: L.PointExpression;
    iconAnchor?: L.PointExpression;
};

const defaultLocation = {
    latitude: 10.8085022,
    longitude: 106.7123715,
};

const Map = ({ selectedCenter, locations, userLocation, style, iconSize, iconAnchor, centerLocation }: Props) => {
    const [mapZoom, setMapZoom] = useState(userLocation || centerLocation ? 16 : 11);

    const center: L.LatLngExpression = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : centerLocation
        ? [centerLocation.latitude, centerLocation.longitude]
        : [defaultLocation.latitude, defaultLocation.longitude];

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
        <MapContainer center={center} zoom={mapZoom} style={style ?? mapStyles}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {center && userLocation && (
                <Marker position={center} icon={userIcon}>
                    <Popup>Bạn đang ở đây</Popup>
                </Marker>
            )}
            {locations &&
                locations.map(
                    (location) =>
                        location.location.latitude &&
                        location.location.longitude && (
                            <Marker
                                key={location.id}
                                position={[location.location.latitude, location.location.longitude]}
                                icon={centerIcon}
                            >
                                <Popup className="z-[9999] absolute">
                                    <div>
                                        <Link to="/trung-tâm/center" className="text-sub">
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
                        ),
                )}
            {centerLocation && selectedCenter && (
                <Marker
                    key={selectedCenter.id}
                    position={[selectedCenter.location.latitude, selectedCenter.location.longitude]}
                    icon={centerIcon}
                >
                    <Popup>
                        <div>
                            <Link
                                to={`/trung-tâm/${formatLink(selectedCenter.title)}-c.${selectedCenter.id}`}
                                className="text-sub"
                            >
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
            {userLocation || centerLocation ? (
                <MapZoom center={center} mapZoom={16} />
            ) : (
                <MapZoom center={center} mapZoom={11} />
            )}
        </MapContainer>
    );
};

export default Map;
