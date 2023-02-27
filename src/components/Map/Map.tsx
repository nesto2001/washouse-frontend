import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { CenterMap } from '../../types/CenterMap';

type Props = { selectedCenter?: CenterMap; centers: CenterMap[] };

const MAP_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const Map = ({ selectedCenter, centers }: Props) => {
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({
        lat: centers[0].location.lat,
        lng: centers[0].location.lng,
    });
    const mapStyles = {
        height: '100vh',
        width: '100%',
    };

    const defaultCenter = {
        lat: center.lat,
        lng: center.lng,
    };

    const handleMarkerClick = (center: CenterMap) => {
        setCenter({ lat: center.location.lat, lng: center.location.lng });
    };

    const [map, setMap] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        if (map) {
            // center the map on the selected center's location
            map.setCenter(center);
        }
    }, [map, center]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyClrZ2yYY2WEOonW9QuK_ir0JXprsEweYM">
            <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter} onLoad={(map) => setMap(map)}>
                {centers.map((center) => (
                    <Marker
                        key={center.id}
                        position={center.location}
                        onClick={() => handleMarkerClick(center)}
                        title={center.title}
                        label={center.rating.toString()}
                    >
                        {selectedCenter && selectedCenter.id === center.id && (
                            <InfoWindow position={center.location}>
                                <>
                                    <h2>{center.title}</h2>
                                    <p>Rating: {center.rating}</p>
                                </>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
