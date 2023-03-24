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
import { LocationType } from '../../types/LocationType';

type Props = {
    addressLocation: LocationType;
    iconSize?: L.PointExpression;
    iconAnchor?: L.PointExpression;
    setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
};

const LocationMap = ({ addressLocation, iconSize, iconAnchor, setLocation }: Props) => {
    const center: L.LatLngExpression = addressLocation ? [addressLocation.latitude, addressLocation.longitude] : [0, 0];
    const mapContainer = useRef(null);

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

    useEffect(() => {
        const mymap = L.map('locationMap').setView(center, 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(mymap);
        const marker = L.marker(center, {
            draggable: true,
            icon: userIcon,
        }).addTo(mymap);
        marker.on('dragend', async (event: L.LeafletEvent) => {
            const marker = event.target as L.Marker;
            const position = marker.getLatLng();
            const lat = position.lat;
            const lng = position.lng;
            setLocation({ latitude: lat, longitude: lng });
        });

        console.log(mymap.getContainer(), 22);
        return () => {
            mymap?.remove();
        };
    }, []);

    return <div id="locationMap" style={{ height: '500px' }}></div>;
};

export default LocationMap;
