import React from 'react';
import { useMap } from 'react-leaflet';

type Props = {
    center: L.LatLngExpression;
    mapZoom: number;
};

const MapZoom = ({ center, mapZoom }: Props) => {
    const map = useMap();
    map.flyTo(center, mapZoom);
    return null;
};

export default MapZoom;
